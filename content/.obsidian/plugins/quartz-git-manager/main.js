const { Plugin, PluginSettingTab, Setting, Modal, Notice } = require('obsidian');
const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

// Impostazioni Predefinite
const DEFAULT_SETTINGS = {
  defaultBranch: 'v4',
  draftBranch: 'draft',
  autoPullOnStartup: true,
  enableExitGuard: true,
  autoCommitPrefix: 'Backup appunti: ',
  customGitPath: '',
  warnOnLargeFiles: true,
  createBackupOnFreshStart: true
};

// ==========================================================
// GIT SERVICE
// ==========================================================
class GitService {
  constructor(plugin) {
    this.plugin = plugin;
    this._cachedRepoRoot = null;
  }

  get vaultPath() {
    return this.plugin.app.vault.adapter.basePath || '.';
  }

  get gitPath() {
    return this.plugin.settings.customGitPath.trim() || 'git';
  }

  async getRepoRoot() {
    if (this._cachedRepoRoot) return this._cachedRepoRoot;
    const res = await this.execGit(['rev-parse', '--show-toplevel'], { cwd: this.vaultPath });
    if (res.success && res.stdout) {
      this._cachedRepoRoot = path.normalize(res.stdout.trim());
      return this._cachedRepoRoot;
    }
    return this.vaultPath;
  }

  execGit(args, options = {}) {
    return new Promise(async (resolve) => {
      const gitCmd = this.gitPath;
      const cwd = options.cwd || (this._cachedRepoRoot || this.vaultPath);

      execFile(
        gitCmd,
        args,
        {
          cwd,
          timeout: options.timeout || 45000,
          env: {
            ...process.env,
            LANG: 'en_US.UTF-8',
            LC_ALL: 'en_US.UTF-8',
            GIT_TERMINAL_PROMPT: '0',
            GIT_OPTIONAL_LOCKS: '0'
          }
        },
        (error, stdout, stderr) => {
          const out = (stdout || '').trim();
          const err = (stderr || '').trim();

          if (error) {
            resolve({
              success: false,
              stdout: out,
              stderr: err,
              error: error.message,
              code: error.code
            });
          } else {
            resolve({
              success: true,
              stdout: out,
              stderr: err,
              error: null,
              code: 0
            });
          }
        }
      );
    });
  }

  async getCurrentBranch() {
    const res = await this.execGit(['branch', '--show-current']);
    if (res.success && res.stdout) {
      return res.stdout;
    }
    return this.plugin.settings.defaultBranch;
  }

  async isMergeInProgress() {
    const res = await this.execGit(['rev-parse', '-q', '--verify', 'MERGE_HEAD']);
    return res.success && Boolean(res.stdout);
  }

  async isRebaseInProgress() {
    const repoRoot = await this.getRepoRoot();
    const rebaseMerge = path.join(repoRoot, '.git', 'rebase-merge');
    const rebaseApply = path.join(repoRoot, '.git', 'rebase-apply');
    return fs.existsSync(rebaseMerge) || fs.existsSync(rebaseApply);
  }

  async getStatus() {
    await this.getRepoRoot();
    const branch = await this.getCurrentBranch();
    const res = await this.execGit(['status', '--porcelain', '-b']);
    const mergePending = await this.isMergeInProgress();

    if (!res.success) {
      return {
        success: false,
        branch,
        isClean: false,
        ahead: 0,
        behind: 0,
        files: [],
        hasConflicts: mergePending,
        isMergePending: mergePending,
        largeFiles: [],
        rawError: res.stderr || res.error
      };
    }

    const lines = res.stdout.split('\n').map(l => l.trimEnd()).filter(Boolean);
    let ahead = 0;
    let behind = 0;
    let hasConflicts = mergePending;
    const files = [];
    const largeFiles = [];
    const repoRoot = await this.getRepoRoot();

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith('##')) {
        const aheadMatch = line.match(/ahead (\d+)/);
        const behindMatch = line.match(/behind (\d+)/);
        if (aheadMatch) ahead = parseInt(aheadMatch[1], 10);
        if (behindMatch) behind = parseInt(behindMatch[1], 10);
      } else {
        const code = line.substring(0, 2);
        let filePath = line.substring(3).trim();
        if (filePath.startsWith('"') && filePath.endsWith('"')) {
          filePath = filePath.slice(1, -1);
        }

        let status = 'M';
        let statusLabel = 'Modificato';
        if (code.includes('?')) {
          status = '?';
          statusLabel = 'Nuovo';
        } else if (code.includes('A')) {
          status = 'A';
          statusLabel = 'Aggiunto';
        } else if (code.includes('D')) {
          status = 'D';
          statusLabel = 'Eliminato';
        } else if (code.includes('U') || code === 'AA' || code === 'DD') {
          status = 'U';
          statusLabel = 'Conflitto';
          hasConflicts = true;
        }

        // Controllo dimensione file
        if (this.plugin.settings.warnOnLargeFiles && status !== 'D') {
          try {
            const fullPath = path.resolve(repoRoot, filePath);
            if (fs.existsSync(fullPath)) {
              const stat = fs.statSync(fullPath);
              if (stat && stat.isFile && stat.isFile()) {
                const sizeMb = (stat.size / (1024 * 1024)).toFixed(1);
                if (stat.size > 25 * 1024 * 1024) {
                  largeFiles.push({ path: filePath, sizeMb });
                }
              }
            }
          } catch (e) {
            // Stat non critico
          }
        }

        files.push({ code, status, statusLabel, path: filePath });
      }
    }

    return {
      success: true,
      branch,
      isClean: files.length === 0,
      ahead,
      behind,
      files,
      hasConflicts,
      isMergePending: mergePending,
      largeFiles,
      rawError: null
    };
  }

  async getRecentCommits(limit = 8) {
    const res = await this.execGit(['log', '--oneline', '--decorate', `-${limit}`]);
    if (!res.success) return [];
    return res.stdout.split('\n').filter(Boolean);
  }

  async getAvailableBranches() {
    const res = await this.execGit(['branch', '-a']);
    if (!res.success) return [];
    return res.stdout.split('\n').map(b => b.replace('*', '').trim()).filter(Boolean);
  }

  async getDetailedBranches() {
    await this.execGit(['fetch', '--prune', 'origin'], { timeout: 10000 });
    const currentBranch = await this.getCurrentBranch();

    const localRes = await this.execGit(['branch', '--format=%(refname:short)|%(upstream:short)']);
    const allBranches = new Map();

    if (localRes.success && localRes.stdout) {
      localRes.stdout.split('\n').filter(Boolean).forEach(line => {
        const [name, upstream] = line.split('|');
        if (name) {
          const trimmed = name.trim();
          allBranches.set(trimmed, {
            name: trimmed,
            isLocal: true,
            isRemote: false,
            upstream: upstream ? upstream.trim() : null
          });
        }
      });
    }

    const remoteRes = await this.execGit(['branch', '-r', '--format=%(refname:short)']);
    if (remoteRes.success && remoteRes.stdout) {
      remoteRes.stdout.split('\n').filter(Boolean).forEach(line => {
        const fullRemote = line.trim();
        if (fullRemote.includes('HEAD') || fullRemote === 'origin') return;
        const cleanName = fullRemote.replace(/^origin\//, '');
        if (allBranches.has(cleanName)) {
          const item = allBranches.get(cleanName);
          item.isRemote = true;
          item.remoteName = fullRemote;
        } else {
          allBranches.set(cleanName, {
            name: cleanName,
            isLocal: false,
            isRemote: true,
            remoteName: fullRemote
          });
        }
      });
    }

    const list = Array.from(allBranches.values()).map(b => ({
      ...b,
      isCurrent: (b.name === currentBranch)
    }));

    list.sort((a, b) => {
      if (a.isCurrent) return -1;
      if (b.isCurrent) return 1;
      return a.name.localeCompare(b.name);
    });

    return {
      currentBranch,
      branches: list
    };
  }

  async fetch() {
    return await this.execGit(['fetch', '--prune', 'origin']);
  }

  async pull(branch) {
    return await this.execGit(['pull', 'origin', branch]);
  }

  async abortMerge() {
    return await this.execGit(['merge', '--abort']);
  }

  async abortRebase() {
    return await this.execGit(['rebase', '--abort']);
  }

  async switchBranch(targetBranch) {
    const branches = await this.getAvailableBranches();
    const hasLocal = branches.some(b => b === targetBranch);

    if (hasLocal) {
      return await this.execGit(['switch', targetBranch]);
    } else {
      return await this.execGit(['switch', '-c', targetBranch, '--track', `origin/${targetBranch}`]);
    }
  }

  async createAndSwitchBranch(newBranchName) {
    return await this.execGit(['switch', '-c', newBranchName]);
  }

  async commitAndPush(message, branch) {
    const addRes = await this.execGit(['add', '-A']);
    if (!addRes.success) {
      return { success: false, step: 'git add', error: addRes.stderr || addRes.error };
    }

    const commitRes = await this.execGit(['commit', '-m', message]);
    if (!commitRes.success) {
      const stdoutLower = (commitRes.stdout || '').toLowerCase();
      const stderrLower = (commitRes.stderr || '').toLowerCase();
      if (
        stdoutLower.includes('nothing to commit') || stderrLower.includes('nothing to commit') ||
        stdoutLower.includes('no changes added to commit') || stderrLower.includes('no changes added to commit') ||
        stdoutLower.includes('nothing added to commit') || stderrLower.includes('nothing added to commit')
      ) {
        // ok, nessun nuovo file, procediamo al push di eventuali commit pendenti
      } else {
        return { success: false, step: 'git commit', error: commitRes.stderr || commitRes.error };
      }
    }

    const pushRes = await this.execGit(['push', 'origin', branch]);
    if (!pushRes.success) {
      return { success: false, step: 'git push', error: pushRes.stderr || pushRes.error };
    }

    return { success: true };
  }

  async stashAndPull(branch) {
    const stashRes = await this.execGit(['stash', 'save', '-u', 'Auto-stash prima di pull']);
    const pulledRes = await this.pull(branch);
    let popRes = null;
    if (stashRes.success && !stashRes.stdout.includes('No local changes to save')) {
      popRes = await this.execGit(['stash', 'pop']);
    }
    return {
      success: pulledRes.success,
      stashSuccess: stashRes.success,
      popSuccess: popRes ? popRes.success : true,
      pullError: pulledRes.stderr || pulledRes.error,
      popError: popRes ? (popRes.stderr || popRes.error) : null
    };
  }

  // ==========================================================
  // FRESH START RESET (RIPRISTINO COMPLETO DA CLOUD / FRESH CLONE)
  // ==========================================================
  async freshStartReset(branch, createBackup = true, onProgress = null) {
    const update = (msg) => { if (onProgress) onProgress(msg); };

    update('🌐 1/5: Connessione a GitHub e scaricamento aggiornamenti...');
    const fetchRes = await this.execGit(['fetch', '--prune', 'origin'], { timeout: 60000 });
    if (!fetchRes.success) {
      return {
        success: false,
        step: 'fetch origin',
        error: fetchRes.stderr || fetchRes.error
      };
    }

    // Backup di sicurezza delle modifiche locali
    if (createBackup) {
      update('💾 2/5: Creazione backup locale di sicurezza prima della sovrascrittura...');
      try {
        const statusRes = await this.getStatus();
        if (statusRes.files && statusRes.files.length > 0) {
          const repoRoot = await this.getRepoRoot();
          const now = new Date();
          const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
          const backupDir = path.join(this.vaultPath, '.obsidian', 'backups', `fresh_start_${stamp}`);

          for (const f of statusRes.files) {
            if (f.status === 'D') continue;
            const src = path.resolve(repoRoot, f.path);
            if (fs.existsSync(src)) {
              try {
                const stat = fs.statSync(src);
                if (stat.isFile()) {
                  const dest = path.join(backupDir, f.path);
                  fs.mkdirSync(path.dirname(dest), { recursive: true });
                  fs.copyFileSync(src, dest);
                }
              } catch (e) {
                // Copia singolo file non critica
              }
            }
          }
        }
      } catch (err) {
        console.warn('[Git Sync] Backup locale prima del fresh start fallito (procedo ugualmente):', err);
      }
    } else {
      update('⏩ 2/5: Backup locale saltato.');
    }

    update('🧹 3/5: Annullamento di conflitti, merge o rebase in sospeso...');
    await this.abortMerge();
    await this.abortRebase();

    update('🗑️ 4/5: Rimozione file e cartelle orfane non tracciate...');
    await this.execGit(['clean', '-fd']);

    update(`🔄 5/5: Allineamento forzato al commit più recente di origin/${branch}...`);
    const resetRes = await this.execGit(['reset', '--hard', `origin/${branch}`]);
    if (!resetRes.success) {
      return {
        success: false,
        step: `git reset --hard origin/${branch}`,
        error: resetRes.stderr || resetRes.error
      };
    }

    // Ulteriore passata di pulizia post-reset
    await this.execGit(['clean', '-fd']);

    return { success: true };
  }

  formatError(errText) {
    if (!errText) return 'Errore sconosciuto durante l\'operazione Git.';
    if (errText.includes('Could not resolve host') || errText.includes('Failed to connect') || errText.includes('Network is unreachable')) {
      return '🌐 <b>Dispositivo Offline</b>: Impossibile raggiungere GitHub. Verifica la connessione Internet.';
    }
    if (errText.includes('unable to unlink old') || errText.includes('Invalid argument') || errText.includes('Permission denied')) {
      return '🔒 <b>File Bloccato da Windows</b>: Uno o più file sono aperti o bloccati dal sistema operativo. Prova a chiudere le schede in Obsidian o a eseguire un <b>Fresh Start</b>.';
    }
    if (errText.includes('Pulling is not possible because you have unmerged files') || errText.includes('unmerged files') || errText.includes('MERGE_HEAD exists')) {
      return '🛑 <b>Merge con Conflitti in Sospeso</b>: C\'è un tentativo di unione non terminato. Clicca su "Annulla Merge" o esegui un "Fresh Start" per ripristinare il repository.';
    }
    if (errText.includes('diverged') || errText.includes('have diverged')) {
      return '🔀 <b>Cronologia Divergente</b>: La cronologia locale e quella di GitHub sono separate (ad es. per riscrittura commit). Esegui un <b>Fresh Start</b> per riallinearti al cloud.';
    }
    if (errText.includes('Updates were rejected because the remote contains work') || errText.includes('non-fast-forward')) {
      return '⚠️ <b>Aggiornamenti Rifiutati</b>: Su GitHub sono presenti nuovi commit non ancora scaricati. Esegui un <b>Pull</b> o un <b>Fresh Start</b> prima di inviare.';
    }
    if (errText.includes('Automatic merge failed') || errText.includes('conflict')) {
      return '🛑 <b>Conflitto di Merge</b>: Sono presenti modifiche contrastanti tra locale e remoto. Puoi risolvere i file oppure annullare il merge.';
    }
    if (errText.includes('Permission denied (publickey)') || errText.includes('Authentication failed')) {
      return '🔑 <b>Errore di Autenticazione</b>: Credenziali Git o chiave SSH non valide o scadute.';
    }
    return errText;
  }
}

// ==========================================================
// MAIN PLUGIN CLASS
// ==========================================================
class QuartzGitManagerPlugin extends Plugin {
  async onload() {
    await this.loadSettings();

    this.git = new GitService(this);
    this.isClosing = false;
    this.isCheckingExit = false;

    // Aggiunta status bar
    this.statusBarEl = this.addStatusBarItem();
    this.statusBarEl.addClass('qgm-status-bar');
    this.statusBarEl.addEventListener('click', () => {
      new MainManagerModal(this.app, this).open();
    });

    // Aggiunta icona Ribbon
    this.addRibbonIcon('git-pull-request', 'Git Sync Manager', () => {
      new MainManagerModal(this.app, this).open();
    });

    // Registrazione Comandi
    this.addCommand({
      id: 'open-manager',
      name: 'Apri Pannello di Controllo Git Sync',
      callback: () => new MainManagerModal(this.app, this).open()
    });

    this.addCommand({
      id: 'pull-sync',
      name: 'Sincronizza / Scarica modifiche (Pull)',
      callback: () => this.executePull()
    });

    this.addCommand({
      id: 'commit-push',
      name: 'Esegui Commit & Push delle note',
      callback: () => new CommitPushModal(this.app, this).open()
    });

    this.addCommand({
      id: 'fresh-start-cloud',
      name: 'Fresh Start: Ripristina e allinea forzatamente con GitHub',
      callback: () => new FreshStartModal(this.app, this).open()
    });

    this.addCommand({
      id: 'abort-merge',
      name: 'Annulla Conflitti / Merge in sospeso',
      callback: async () => {
        const res = await this.git.abortMerge();
        if (res.success) {
          new Notice('✅ Merge annullato con successo. Repository ripristinato.');
        } else {
          new Notice(`⚠️ Nessun merge attivo da annullare oppure errore:\n${res.stderr || res.error}`);
        }
        this.refreshStatusBar();
      }
    });

    this.addCommand({
      id: 'switch-branch',
      name: 'Cambia Branch di lavoro',
      callback: () => new SwitchBranchModal(this.app, this).open()
    });

    this.addCommand({
      id: 'view-status-log',
      name: 'Mostra Stato Git & Cronologia Commit',
      callback: () => new StatusLogModal(this.app, this).open()
    });

    // Tab Impostazioni
    this.addSettingTab(new QuartzGitSettingTab(this.app, this));

    // Exit Guard Listener
    this.setupExitGuard();

    // Auto-Pull all'avvio dopo 1.5 secondi
    setTimeout(() => {
      this.refreshStatusBar();
      if (this.settings.autoPullOnStartup) {
        this.runStartupAutoPull();
      }
    }, 1500);

    // Refresh periodico status bar (ogni 45s)
    this.registerInterval(window.setInterval(() => this.refreshStatusBar(), 45000));
  }

  onunload() {
    if (this.beforeUnloadHandler) {
      window.removeEventListener('beforeunload', this.beforeUnloadHandler);
    }
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
    this.refreshStatusBar();
  }

  setupExitGuard() {
    this.beforeUnloadHandler = (event) => {
      if (this.isClosing || !this.settings.enableExitGuard) {
        return;
      }

      event.preventDefault();
      event.returnValue = '';

      if (this.isCheckingExit) return;
      this.isCheckingExit = true;

      this.git.getStatus().then((status) => {
        if (status.isClean && (!status.ahead || status.ahead === 0)) {
          this.isClosing = true;
          window.close();
        } else {
          new ExitGuardModal(this.app, this, status).open();
        }
      }).catch(() => {
        this.isCheckingExit = false;
      });
    };

    window.addEventListener('beforeunload', this.beforeUnloadHandler);
  }

  async refreshStatusBar() {
    const status = await this.git.getStatus();
    if (!this.statusBarEl) return;

    this.statusBarEl.empty();

    if (!status.success) {
      this.statusBarEl.createEl('span', {
        text: '⚠️ Git: Errore stato',
        cls: 'qgm-badge-draft'
      });
      return;
    }

    const isClean = status.isClean;

    // Dot
    this.statusBarEl.createEl('span', {
      cls: `qgm-status-dot ${isClean ? 'clean' : 'dirty'}`
    });

    // Label Branch
    this.statusBarEl.createEl('span', {
      text: `🌿 ${status.branch}`,
      cls: 'qgm-badge-draft'
    });

    if (!isClean) {
      this.statusBarEl.createEl('span', {
        text: ` (${status.files.length} mod)`,
        cls: 'qgm-badge-draft'
      });
    }

    if (status.behind > 0) {
      this.statusBarEl.createEl('span', {
        text: ` ↓${status.behind}`,
        cls: 'qgm-badge-prod',
        attr: { title: `${status.behind} commit da scaricare da GitHub (esegui pull)` }
      });
    }

    if (status.ahead > 0) {
      this.statusBarEl.createEl('span', {
        text: ` ↑${status.ahead}`,
        cls: 'qgm-badge-draft',
        attr: { title: `${status.ahead} commit locali non ancora inviati` }
      });
    }

    if (status.hasConflicts || status.isMergePending) {
      this.statusBarEl.createEl('span', {
        text: ' 🛑 CONFLITTO',
        cls: 'qgm-badge-prod'
      });
    }

    this.statusBarEl.setAttribute(
      'title',
      `Git Sync Manager\nBranch: ${status.branch}\nStato: ${isClean ? 'Working tree pulito' : status.files.length + ' file con modifiche'}\nSincronizzazione: ↑${status.ahead} da inviare, ↓${status.behind} da scaricare\nClicca per aprire il menu rapido.`
    );
  }

  async runStartupAutoPull() {
    const status = await this.git.getStatus();
    if (!status.success) {
      new Notice(`⚠️ [Git Sync] Impossibile verificare lo stato Git all'avvio:\n${status.rawError}`, 8000);
      return;
    }

    if (status.hasConflicts || status.isMergePending) {
      new Notice(`🛑 [Git Sync] ATTENZIONE: Merge o conflitti in sospeso! Apri Git Sync Manager per risolverli o fare Fresh Start.`, 10000);
      return;
    }

    if (!status.isClean) {
      new Notice(`⚠️ [Git Sync] Rilevate ${status.files.length} modifiche locali. Pull automatico saltato per salvaguardare il tuo lavoro locale.`, 7000);
      return;
    }

    new Notice(`🔄 [Git Sync] Controllo aggiornamenti su origin/${status.branch}...`, 2500);
    const pullRes = await this.git.pull(status.branch);

    if (pullRes.success) {
      if (pullRes.stdout.includes('Already up to date')) {
        new Notice(`✅ [Git Sync] Vault aggiornato (${status.branch}).`, 2500);
      } else {
        new Notice(`📥 [Git Sync] Nuove note scaricate con successo da origin/${status.branch}!`, 5000);
      }
      this.refreshStatusBar();
    } else {
      const formatted = this.git.formatError(pullRes.stderr || pullRes.error);
      new Notice(`⚠️ [Git Sync] Sincronizzazione all'avvio non riuscita:\n${pullRes.stderr || pullRes.error}`, 8000);
    }
  }

  async executePull() {
    const status = await this.git.getStatus();
    const branch = status.branch || await this.git.getCurrentBranch();

    if (status.hasConflicts || status.isMergePending) {
      new PullConflictDialogModal(this.app, this, status).open();
      return;
    }

    new Notice(`🔄 [Git Sync] Pull da origin/${branch} in corso...`);
    const pullRes = await this.git.pull(branch);

    if (pullRes.success) {
      if (pullRes.stdout.includes('Already up to date')) {
        new Notice(`✅ [Git Sync] Già aggiornato con origin/${branch}!`);
      } else {
        new Notice(`📥 [Git Sync] Modifiche scaricate con successo da origin/${branch}!`);
      }
      this.refreshStatusBar();
    } else {
      new PullConflictDialogModal(this.app, this, status, pullRes).open();
    }
  }
}

// ==========================================================
// MODAL: PANNELLO PRINCIPALE
// ==========================================================
class MainManagerModal extends Modal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
  }

  async onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('qgm-modal');

    contentEl.createEl('h2', { text: '⚡ Git Sync Manager' });

    const status = await this.plugin.git.getStatus();

    // Avviso Conflitti o Merge pendente
    if (status.hasConflicts || status.isMergePending) {
      const conflictBox = contentEl.createEl('div', { cls: 'qgm-alert qgm-alert-danger' });
      conflictBox.innerHTML = `🛑 <b>CONFLITTO O MERGE BLOCCATO</b>: È presente un merge interrotto o ci sono file in conflitto.<br>Puoi annullare il merge oppure forzare il ripristino pulito da GitHub.`;
      
      const conflictBtnRow = conflictBox.createEl('div', { attr: { style: 'margin-top: 8px; display: flex; gap: 8px;' } });
      const abortBtn = conflictBtnRow.createEl('button', { text: '↩️ Annulla Merge (Abort)' });
      abortBtn.addEventListener('click', async () => {
        const res = await this.plugin.git.abortMerge();
        if (res.success) {
          new Notice('✅ Merge annullato. Repository sbloccato.');
          this.close();
          new MainManagerModal(this.app, this.plugin).open();
        } else {
          new Notice(`❌ Errore annullamento: ${res.stderr || res.error}`);
        }
      });

      const freshBtn = conflictBtnRow.createEl('button', { text: '🔄 Risolvi con Fresh Start', cls: 'qgm-btn-warning' });
      freshBtn.addEventListener('click', () => {
        this.close();
        new FreshStartModal(this.app, this.plugin).open();
      });
    }

    // Avviso Remote Ahead (Behind)
    if (status.behind > 0) {
      const behindBox = contentEl.createEl('div', { cls: 'qgm-alert qgm-alert-warning' });
      behindBox.innerHTML = `⚠️ <b>GitHub è più Recente</b>: Ci sono <b>${status.behind} commit</b> sul server da scaricare.<br>💡 <i>Consiglio: Esegui un <b>Pull</b> prima di salvare nuove note per evitare conflitti.</i>`;
    }

    // Avviso File Grandi
    if (status.largeFiles && status.largeFiles.length > 0) {
      const largeBox = contentEl.createEl('div', { cls: 'qgm-alert qgm-alert-warning' });
      largeBox.innerHTML = `⚠️ <b>File Pesanti Rilevati (>25MB)</b>:<br>` + status.largeFiles.map(f => `• <code>${f.path}</code> (${f.sizeMb} MB)`).join('<br>');
    }

    // Card informativo
    const infoCard = contentEl.createEl('div', { cls: 'qgm-info-card' });

    const row1 = infoCard.createEl('div', { cls: 'qgm-info-row' });
    row1.createEl('span', { text: 'Cartella Vault:', cls: 'qgm-info-label' });
    row1.createEl('span', { text: this.plugin.app.vault.getName(), cls: 'qgm-info-value' });

    const row2 = infoCard.createEl('div', { cls: 'qgm-info-row' });
    row2.createEl('span', { text: 'Branch Attivo:', cls: 'qgm-info-label' });
    row2.createEl('span', { text: `🌿 ${status.branch}`, cls: 'qgm-info-value qgm-badge-draft' });

    const row3 = infoCard.createEl('div', { cls: 'qgm-info-row' });
    row3.createEl('span', { text: 'Stato File Locali:', cls: 'qgm-info-label' });
    row3.createEl('span', {
      text: status.isClean ? '🟢 Nessuna modifica locale (pulito)' : `🟠 ${status.files.length} file modificati/nuovi`,
      cls: 'qgm-info-value'
    });

    const row4 = infoCard.createEl('div', { cls: 'qgm-info-row' });
    row4.createEl('span', { text: 'Sincronizzazione GitHub:', cls: 'qgm-info-label' });
    if (status.ahead === 0 && status.behind === 0) {
      row4.createEl('span', { text: '✅ Perfettamente allineato con origin', cls: 'qgm-info-value' });
    } else {
      row4.createEl('span', {
        text: `${status.ahead > 0 ? `↑ ${status.ahead} commit da inviare  ` : ''}${status.behind > 0 ? `↓ ${status.behind} commit da scaricare` : ''}`,
        cls: 'qgm-info-value'
      });
    }

    // Bottoni Azioni Principali
    const actionsContainer = contentEl.createEl('div', { cls: 'qgm-actions-list' });

    new Setting(actionsContainer)
      .setName('📥 Sincronizza / Scarica (Pull)')
      .setDesc(`Scarica gli ultimi aggiornamenti da origin/${status.branch}`)
      .addButton(btn => btn
        .setButtonText(status.behind > 0 ? `Esegui Pull (↓${status.behind})` : 'Esegui Pull')
        .setCta()
        .onClick(async () => {
          this.close();
          await this.plugin.executePull();
        })
      );

    new Setting(actionsContainer)
      .setName('📤 Salva & Invia (Commit + Push)')
      .setDesc('Crea un commit con le note modificate e caricale su GitHub')
      .addButton(btn => btn
        .setButtonText('Commit & Push')
        .setClass('qgm-btn-success')
        .onClick(() => {
          this.close();
          new CommitPushModal(this.app, this.plugin, status).open();
        })
      );

    new Setting(actionsContainer)
      .setName('🔀 Cambia Branch')
      .setDesc('Passa ad un altro branch locale o remoto')
      .addButton(btn => btn
        .setButtonText('Switch Branch')
        .onClick(() => {
          this.close();
          new SwitchBranchModal(this.app, this.plugin).open();
        })
      );

    new Setting(actionsContainer)
      .setName('📊 Stato File & Cronologia Commit')
      .setDesc('Visualizza nel dettaglio i file modificati e gli ultimi commit')
      .addButton(btn => btn
        .setButtonText('Vedi Dettagli')
        .onClick(() => {
          this.close();
          new StatusLogModal(this.app, this.plugin).open();
        })
      );

    // SEZIONE RIPRISTINO DI EMERGENZA (FRESH START)
    new Setting(actionsContainer)
      .setName('🆘 Fresh Start / Ripristino da GitHub')
      .setDesc('Risolve blocchi, divergenze o conflitti allineando forzatamente il vault allo stato esatto di GitHub (equivalente a un clone fresco).')
      .addButton(btn => btn
        .setButtonText('🔄 Fresh Start')
        .setClass('qgm-btn-warning')
        .onClick(() => {
          this.close();
          new FreshStartModal(this.app, this.plugin).open();
        })
      );
  }

  onClose() {
    this.contentEl.empty();
  }
}

// ==========================================================
// MODAL: FRESH START (RIPRISTINO TOTALE DA CLOUD)
// ==========================================================
class FreshStartModal extends Modal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
  }

  async onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('qgm-modal');

    contentEl.createEl('h2', { text: '🔄 Fresh Start: Ripristino da GitHub' });

    const status = await this.plugin.git.getStatus();
    const branch = status.branch || this.plugin.settings.defaultBranch;

    const descBox = contentEl.createEl('div', { cls: 'qgm-alert qgm-alert-info' });
    descBox.innerHTML = `Questa operazione garantisce che il vault locale sia <b>identico al 100% alla versione presente su GitHub</b> (branch <code>origin/${branch}</code>), risolvendo istantaneamente qualsiasi problema di conflitti, file orfani o divergenza storica.<br><br>
<b>Cosa farà esattamente:</b>
<ul style="margin: 6px 0 0 18px; padding: 0;">
  <li>Scarica l'ultimo stato aggiornato da GitHub (<code>git fetch --prune</code>).</li>
  <li>Crea una copia di backup automatica delle modifiche locali non sincronizzate in <code>.obsidian/backups/</code>.</li>
  <li>Annulla qualsiasi merge o rebase interrotto (<code>git merge --abort</code>).</li>
  <li>Rimuove i file non tracciati e orfani (<code>git clean -fd</code>).</li>
  <li>Resetta forzatamente il branch locale a quello remoto (<code>git reset --hard origin/${branch}</code>).</li>
</ul>`;

    // Opzione Backup
    const backupOptionContainer = contentEl.createEl('div', { cls: 'qgm-checkbox-row' });
    const backupCheckbox = backupOptionContainer.createEl('input', {
      type: 'checkbox',
      attr: { id: 'qgm-backup-checkbox' }
    });
    backupCheckbox.checked = this.plugin.settings.createBackupOnFreshStart;

    const backupLabel = backupOptionContainer.createEl('label', {
      text: ' Crea copia di sicurezza locale prima di sovrascrivere (consigliato)',
      attr: { for: 'qgm-backup-checkbox' }
    });

    const statusMsgContainer = contentEl.createEl('div', {
      cls: 'qgm-info-card',
      attr: { style: 'margin-top: 14px; display: none;' }
    });

    const btnGroup = contentEl.createEl('div', { cls: 'qgm-button-group' });
    const cancelBtn = btnGroup.createEl('button', { text: 'Annulla' });
    cancelBtn.addEventListener('click', () => this.close());

    const confirmBtn = btnGroup.createEl('button', {
      text: `🚀 Esegui Fresh Start (${branch})`,
      cls: 'qgm-btn-warning'
    });

    confirmBtn.addEventListener('click', async () => {
      confirmBtn.disabled = true;
      cancelBtn.disabled = true;
      statusMsgContainer.style.display = 'block';

      const updateProgress = (text) => {
        statusMsgContainer.innerHTML = `<span class="qgm-loading-spinner"></span> ${text}`;
      };

      const res = await this.plugin.git.freshStartReset(branch, backupCheckbox.checked, updateProgress);

      if (res.success) {
        statusMsgContainer.innerHTML = '✅ <b>Ripristino completato con successo!</b> Il vault è ora perfettamente identico a GitHub.';
        new Notice('🎉 Fresh Start completato! Vault allineato al cloud al 100%.', 6000);
        this.plugin.refreshStatusBar();
        setTimeout(() => this.close(), 1600);
      } else {
        confirmBtn.disabled = false;
        cancelBtn.disabled = false;
        const formattedErr = this.plugin.git.formatError(res.error);
        statusMsgContainer.innerHTML = `❌ <b>Errore durante ${res.step}:</b><br>${formattedErr}<br><pre style="white-space: pre-wrap; font-size: 11px; margin-top: 6px;">${res.error}</pre>`;
      }
    });
  }

  onClose() {
    this.contentEl.empty();
  }
}

// ==========================================================
// MODAL: DIALOGO CONFLITTO O MODIFICHE PENDENTI SU PULL
// ==========================================================
class PullConflictDialogModal extends Modal {
  constructor(app, plugin, status, pullError = null) {
    super(app);
    this.plugin = plugin;
    this.status = status;
    this.pullError = pullError;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('qgm-modal');

    contentEl.createEl('h2', { text: '⚠️ Sincronizzazione Pull Bloccata' });

    const alertBox = contentEl.createEl('div', { cls: 'qgm-alert qgm-alert-warning' });
    if (this.pullError) {
      const formatted = this.plugin.git.formatError(this.pullError.stderr || this.pullError.error);
      alertBox.innerHTML = `<b>Il pull non è riuscito:</b><br>${formatted}<br><pre style="white-space: pre-wrap; font-size: 11px; margin-top: 6px;">${this.pullError.stderr || this.pullError.error}</pre>`;
    } else {
      alertBox.innerHTML = `Sono presenti conflitti o modifiche locali pendenti che impediscono un pull automatico pulito.`;
    }

    contentEl.createEl('p', { text: 'Come desideri procedere?' });

    const actionsContainer = contentEl.createEl('div', { cls: 'qgm-actions-list' });

    // Opzione 1: Stash & Pull
    new Setting(actionsContainer)
      .setName('📦 Salva temporaneamente (Stash) ed esegui Pull')
      .setDesc('Mette temporaneamente da parte le modifiche locali, scarica da GitHub e riapplica il tuo lavoro.')
      .addButton(btn => btn
        .setButtonText('Stash & Pull')
        .onClick(async () => {
          this.close();
          new Notice('🔄 Esecuzione Stash & Pull in corso...');
          const res = await this.plugin.git.stashAndPull(this.status.branch);
          if (res.success && res.popSuccess) {
            new Notice('✅ Sincronizzazione con Stash completata!');
          } else {
            new Notice(`⚠️ Pull eseguito ma si sono verificati avvisi durante il ripristino delle modifiche.`);
          }
          this.plugin.refreshStatusBar();
        })
      );

    // Opzione 2: Fresh Start
    new Setting(actionsContainer)
      .setName('🔄 Fresh Start (Sovrascrivi con la versione di GitHub)')
      .setDesc('Allinea forzatamente il vault allo stato di GitHub. Crea un backup di sicurezza locale automatico.')
      .addButton(btn => btn
        .setButtonText('Fresh Start')
        .setClass('qgm-btn-warning')
        .onClick(() => {
          this.close();
          new FreshStartModal(this.app, this.plugin).open();
        })
      );

    // Opzione 3: Commit & Push prima del Pull
    new Setting(actionsContainer)
      .setName('💾 Crea prima un Commit del lavoro locale')
      .setDesc('Registra le modifiche locali in un commit prima di effettuare il pull.')
      .addButton(btn => btn
        .setButtonText('Commit Modifiche')
        .onClick(() => {
          this.close();
          new CommitPushModal(this.app, this.plugin, this.status).open();
        })
      );

    const btnGroup = contentEl.createEl('div', { cls: 'qgm-button-group' });
    btnGroup.createEl('button', { text: 'Chiudi' }).addEventListener('click', () => this.close());
  }

  onClose() {
    this.contentEl.empty();
  }
}

// ==========================================================
// MODAL: COMMIT & PUSH
// ==========================================================
class CommitPushModal extends Modal {
  constructor(app, plugin, preloadedStatus = null) {
    super(app);
    this.plugin = plugin;
    this.preloadedStatus = preloadedStatus;
  }

  async onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('qgm-modal');

    contentEl.createEl('h2', { text: '📤 Commit & Push delle Modifiche' });

    const status = this.preloadedStatus || await this.plugin.git.getStatus();

    if (status.isClean && status.ahead === 0) {
      contentEl.createEl('div', {
        text: 'Nessuna modifica locale rilevata e nessun commit in sospeso.',
        cls: 'qgm-alert qgm-alert-info'
      });
      const btnGroup = contentEl.createEl('div', { cls: 'qgm-button-group' });
      btnGroup.createEl('button', { text: 'Chiudi' }).addEventListener('click', () => this.close());
      return;
    }

    // Avviso se il remoto ha commit non scaricati
    if (status.behind > 0) {
      const behindAlert = contentEl.createEl('div', { cls: 'qgm-alert qgm-alert-warning' });
      behindAlert.innerHTML = `⚠️ <b>Attenzione</b>: Il server ha <b>${status.behind} commit</b> che non hai ancora scaricato.<br>Ti raccomandiamo di fare prima <b>Pull</b> per prevenire rifiuti di push o conflitti.`;
    }

    // Avviso file grandi
    if (status.largeFiles && status.largeFiles.length > 0) {
      const largeAlert = contentEl.createEl('div', { cls: 'qgm-alert qgm-alert-warning' });
      largeAlert.innerHTML = `⚠️ <b>File voluminosi inclusi</b>: ` + status.largeFiles.map(f => `<code>${f.path}</code> (${f.sizeMb}MB)`).join(', ');
    }

    // Lista file modificati
    if (status.files.length > 0) {
      contentEl.createEl('div', { text: `File modificati (${status.files.length}):`, cls: 'qgm-info-label' });
      const fileList = contentEl.createEl('div', { cls: 'qgm-file-list' });
      status.files.forEach(f => {
        const item = fileList.createEl('div', { cls: 'qgm-file-item' });
        item.createEl('span', { text: `[${f.statusLabel}]`, cls: `qgm-file-status qgm-status-${f.status}` });
        item.createEl('span', { text: f.path });
      });
    }

    // Input messaggio commit
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const defaultMsg = `${this.plugin.settings.autoCommitPrefix}${dateStr}`;

    contentEl.createEl('div', { text: 'Messaggio di commit:', cls: 'qgm-info-label', attr: { style: 'margin-top: 10px;' } });
    const msgInput = contentEl.createEl('input', {
      type: 'text',
      value: defaultMsg,
      attr: { style: 'width: 100%; margin-top: 4px; padding: 6px;' }
    });

    const errorContainer = contentEl.createEl('div', { attr: { style: 'margin-top: 10px;' } });

    // Bottoni
    const btnGroup = contentEl.createEl('div', { cls: 'qgm-button-group' });
    const cancelBtn = btnGroup.createEl('button', { text: 'Annulla' });
    cancelBtn.addEventListener('click', () => this.close());

    const submitBtn = btnGroup.createEl('button', {
      text: `Invia su origin/${status.branch}`,
      cls: 'qgm-btn-success'
    });

    submitBtn.addEventListener('click', async () => {
      const msg = msgInput.value.trim();
      if (!msg) {
        new Notice('Inserisci un messaggio di commit valido.');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="qgm-loading-spinner"></span> Invio in corso...';
      errorContainer.empty();

      const res = await this.plugin.git.commitAndPush(msg, status.branch);
      if (res.success) {
        new Notice(`✅ Push completato con successo su origin/${status.branch}!`, 6000);
        this.plugin.refreshStatusBar();
        this.close();
      } else {
        submitBtn.disabled = false;
        submitBtn.innerText = `Riprova Invio (${status.branch})`;
        const errBox = errorContainer.createEl('div', { cls: 'qgm-alert qgm-alert-danger' });
        const formattedErr = this.plugin.git.formatError(res.error);
        errBox.innerHTML = `<b>Errore durante ${res.step}:</b><br>${formattedErr}<br><pre style="white-space: pre-wrap; font-size: 11px; margin-top: 6px;">${res.error}</pre>`;
      }
    });
  }

  onClose() {
    this.contentEl.empty();
  }
}

// ==========================================================
// MODAL: EXIT GUARD (SALVAGUARDIA CHIUSURA)
// ==========================================================
class ExitGuardModal extends Modal {
  constructor(app, plugin, status) {
    super(app);
    this.plugin = plugin;
    this.status = status;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('qgm-modal');

    contentEl.createEl('h2', { text: '🛑 Salvaguardia Chiusura: Modifiche Rilevate' });

    const alertBox = contentEl.createEl('div', { cls: 'qgm-alert qgm-alert-warning' });
    alertBox.innerHTML = `Hai <b>${this.status.files.length} modifiche locali</b> o commit non inviati sul branch <b>${this.status.branch}</b>.<br>Vuoi salvare e sincronizzare su GitHub prima di chiudere Obsidian?`;

    // Lista file
    if (this.status.files.length > 0) {
      const fileList = contentEl.createEl('div', { cls: 'qgm-file-list' });
      this.status.files.forEach(f => {
        const item = fileList.createEl('div', { cls: 'qgm-file-item' });
        item.createEl('span', { text: `[${f.statusLabel}]`, cls: `qgm-file-status qgm-status-${f.status}` });
        item.createEl('span', { text: f.path });
      });
    }

    // Messaggio commit
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const defaultMsg = `${this.plugin.settings.autoCommitPrefix}${dateStr}`;

    contentEl.createEl('div', { text: 'Messaggio di commit per il backup:', cls: 'qgm-info-label' });
    const msgInput = contentEl.createEl('input', {
      type: 'text',
      value: defaultMsg,
      attr: { style: 'width: 100%; margin-top: 4px; padding: 6px;' }
    });

    const errorContainer = contentEl.createEl('div', { attr: { style: 'margin-top: 10px;' } });

    // Bottoni Azioni
    const btnGroup = contentEl.createEl('div', { cls: 'qgm-button-group', attr: { style: 'flex-wrap: wrap;' } });

    const cancelBtn = btnGroup.createEl('button', { text: '❌ Annulla chiusura' });
    cancelBtn.addEventListener('click', () => {
      this.plugin.isCheckingExit = false;
      this.close();
    });

    const forceExitBtn = btnGroup.createEl('button', { text: '🚪 Esci senza inviare', cls: 'qgm-btn-danger' });
    forceExitBtn.addEventListener('click', () => {
      this.plugin.isClosing = true;
      this.close();
      window.close();
    });

    const saveAndExitBtn = btnGroup.createEl('button', {
      text: `💾 Salva, Pusha ed Esci (${this.status.branch})`,
      cls: 'qgm-btn-success'
    });

    saveAndExitBtn.addEventListener('click', async () => {
      const msg = msgInput.value.trim() || defaultMsg;
      saveAndExitBtn.disabled = true;
      saveAndExitBtn.innerHTML = '<span class="qgm-loading-spinner"></span> Sincronizzazione in corso...';
      errorContainer.empty();

      const res = await this.plugin.git.commitAndPush(msg, this.status.branch);
      if (res.success) {
        new Notice('✅ Sincronizzazione completata! Chiusura di Obsidian...', 2000);
        this.plugin.isClosing = true;
        this.close();
        setTimeout(() => window.close(), 500);
      } else {
        saveAndExitBtn.disabled = false;
        saveAndExitBtn.innerText = 'Riprova Salva & Push';
        const errBox = errorContainer.createEl('div', { cls: 'qgm-alert qgm-alert-danger' });
        const formattedErr = this.plugin.git.formatError(res.error);
        errBox.innerHTML = `<b>Errore durante il push (${res.step}):</b><br>${formattedErr}<br><pre style="white-space: pre-wrap; font-size: 11px; margin-top: 6px;">${res.error}</pre>Puoi riprovare oppure scegliere "Esci senza inviare".`;
      }
    });
  }

  onClose() {
    this.plugin.isCheckingExit = false;
    this.contentEl.empty();
  }
}

// ==========================================================
// MODAL: CAMBIO BRANCH
// ==========================================================
class SwitchBranchModal extends Modal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
  }

  async onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('qgm-modal');

    contentEl.createEl('h2', { text: '🔀 Cambio Branch Git' });

    const loadingEl = contentEl.createEl('div', { cls: 'qgm-info-card' });
    loadingEl.innerHTML = '<span class="qgm-loading-spinner"></span> Scansione branch locali e remoti in corso...';

    const [status, branchData] = await Promise.all([
      this.plugin.git.getStatus(),
      this.plugin.git.getDetailedBranches()
    ]);

    loadingEl.remove();

    // Card informativo
    const infoCard = contentEl.createEl('div', { cls: 'qgm-info-card' });
    const row1 = infoCard.createEl('div', { cls: 'qgm-info-row' });
    row1.createEl('span', { text: 'Branch Attivo:', cls: 'qgm-info-label' });
    row1.createEl('span', { text: `🌿 ${branchData.currentBranch}`, cls: 'qgm-info-value qgm-badge-draft' });

    const row2 = infoCard.createEl('div', { cls: 'qgm-info-row' });
    row2.createEl('span', { text: 'Branch Rilevati:', cls: 'qgm-info-label' });
    row2.createEl('span', { text: `${branchData.branches.length} branch totali nel repository`, cls: 'qgm-info-value' });

    if (!status.isClean) {
      const alertBox = contentEl.createEl('div', { cls: 'qgm-alert qgm-alert-warning' });
      alertBox.innerHTML = `⚠️ <b>Modifiche locali non salvate (${status.files.length} file)</b>.<br>Cambiare branch con modifiche pendenti potrebbe causare conflitti. Si raccomanda di committare prima di cambiare branch.`;
    }

    contentEl.createEl('div', { text: 'Branch disponibili nel repository:', cls: 'qgm-info-label', attr: { style: 'margin-top: 10px;' } });

    // Lista Branch Dinamica
    const branchListEl = contentEl.createEl('div', { cls: 'qgm-branch-list' });

    if (branchData.branches.length === 0) {
      branchListEl.createEl('div', { text: 'Nessun branch rilevato.', cls: 'qgm-info-card' });
    } else {
      branchData.branches.forEach(b => {
        const card = branchListEl.createEl('div', { cls: `qgm-branch-card ${b.isCurrent ? 'is-current' : ''}` });
        
        const info = card.createEl('div', { cls: 'qgm-branch-info' });
        info.createEl('span', { text: `🌿 ${b.name}`, cls: 'qgm-branch-name' });

        if (b.isCurrent) {
          info.createEl('span', { text: 'Attivo', cls: 'qgm-tag qgm-tag-current' });
        } else if (b.isLocal && b.isRemote) {
          info.createEl('span', { text: 'Locale + origin', cls: 'qgm-tag qgm-tag-both' });
        } else if (b.isLocal) {
          info.createEl('span', { text: 'Solo Locale', cls: 'qgm-tag qgm-tag-local' });
        } else if (b.isRemote) {
          info.createEl('span', { text: 'Remoto origin', cls: 'qgm-tag qgm-tag-remote' });
        }

        const btn = card.createEl('button', {
          text: b.isCurrent ? 'Attuale' : (b.isLocal ? 'Passa a questo' : 'Scarica e passa'),
          cls: b.isCurrent ? '' : 'qgm-btn-success'
        });

        if (b.isCurrent) {
          btn.disabled = true;
        } else {
          btn.addEventListener('click', async () => {
            await this.performSwitch(b.name);
          });
        }
      });
    }

    // Sezione Crea Nuovo Branch
    const newBranchBox = contentEl.createEl('div', { cls: 'qgm-new-branch-box' });
    newBranchBox.createEl('div', { text: 'Oppure crea e attiva un nuovo branch:', cls: 'qgm-info-label' });
    
    const newBranchRow = newBranchBox.createEl('div', { attr: { style: 'display: flex; gap: 8px; margin-top: 6px;' } });
    const newBranchInput = newBranchRow.createEl('input', {
      type: 'text',
      placeholder: 'es. feature/nuovi-appunti',
      attr: { style: 'flex: 1; padding: 6px;' }
    });
    
    const createBtn = newBranchRow.createEl('button', { text: '➕ Crea & Passa' });
    createBtn.addEventListener('click', async () => {
      const newName = newBranchInput.value.trim().replace(/\s+/g, '-');
      if (!newName) {
        new Notice('Inserisci un nome valido per il nuovo branch.');
        return;
      }
      createBtn.disabled = true;
      createBtn.innerHTML = '<span class="qgm-loading-spinner"></span> Creazione...';

      const res = await this.plugin.git.createAndSwitchBranch(newName);
      if (res.success) {
        new Notice(`✅ Creato e attivato nuovo branch: ${newName}!`, 5000);
        this.plugin.refreshStatusBar();
        this.close();
      } else {
        createBtn.disabled = false;
        createBtn.innerText = '➕ Crea & Passa';
        new Notice(`❌ Impossibile creare il branch:\n${res.stderr || res.error}`, 8000);
      }
    });

    const btnGroup = contentEl.createEl('div', { cls: 'qgm-button-group' });
    btnGroup.createEl('button', { text: 'Chiudi' }).addEventListener('click', () => this.close());
  }

  async performSwitch(targetBranch) {
    this.close();
    new Notice(`🔄 Passaggio al branch ${targetBranch}...`, 3000);
    
    const switchRes = await this.plugin.git.switchBranch(targetBranch);

    if (switchRes.success) {
      new Notice(`✅ Ora sei sul branch ${targetBranch}!`, 4000);
      this.plugin.refreshStatusBar();

      const pullRes = await this.plugin.git.pull(targetBranch);
      if (pullRes.success && !pullRes.stdout.includes('Already up to date')) {
        new Notice(`📥 Branch ${targetBranch} sincronizzato con le modifiche remote!`, 5000);
      }
    } else {
      new Notice(`❌ Errore durante il cambio branch:\n${switchRes.stderr || switchRes.error}`, 10000);
    }
  }

  onClose() {
    this.contentEl.empty();
  }
}

// ==========================================================
// MODAL: STATO GIT & LOG
// ==========================================================
class StatusLogModal extends Modal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
  }

  async onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('qgm-modal');

    contentEl.createEl('h2', { text: '📊 Stato Git & Cronologia Commit' });

    const status = await this.plugin.git.getStatus();
    const commits = await this.plugin.git.getRecentCommits(8);

    contentEl.createEl('h4', { text: `Branch: ${status.branch} (${status.isClean ? 'Pulito' : status.files.length + ' modifiche'})` });

    if (status.files.length > 0) {
      contentEl.createEl('div', { text: 'File modificati:', cls: 'qgm-info-label' });
      const fileList = contentEl.createEl('div', { cls: 'qgm-file-list' });
      status.files.forEach(f => {
        const item = fileList.createEl('div', { cls: 'qgm-file-item' });
        item.createEl('span', { text: `[${f.statusLabel}]`, cls: `qgm-file-status qgm-status-${f.status}` });
        item.createEl('span', { text: f.path });
      });
    }

    contentEl.createEl('h4', { text: 'Ultimi commit registrati:', attr: { style: 'margin-top: 16px;' } });
    const logList = contentEl.createEl('div', { cls: 'qgm-commit-list' });
    if (commits.length === 0) {
      logList.createEl('div', { text: 'Nessun commit trovato.' });
    } else {
      commits.forEach(c => {
        const parts = c.split(' ');
        const hash = parts[0];
        const msg = parts.slice(1).join(' ');
        const item = logList.createEl('div', { cls: 'qgm-commit-item' });
        item.createEl('span', { text: hash, cls: 'qgm-commit-hash' });
        item.createEl('span', { text: msg });
      });
    }

    const btnGroup = contentEl.createEl('div', { cls: 'qgm-button-group' });
    btnGroup.createEl('button', { text: 'Chiudi' }).addEventListener('click', () => this.close());
  }

  onClose() {
    this.contentEl.empty();
  }
}

// ==========================================================
// SETTINGS TAB
// ==========================================================
class QuartzGitSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h2', { text: 'Impostazioni Git Sync Manager' });

    new Setting(containerEl)
      .setName('Branch Principale')
      .setDesc('Il branch principale di sincronizzazione (es. v4 o main).')
      .addText(text => text
        .setValue(this.plugin.settings.defaultBranch)
        .onChange(async (value) => {
          this.plugin.settings.defaultBranch = value.trim() || 'v4';
          await this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName('Branch Bozze (Draft)')
      .setDesc('Branch di lavoro alternativo per bozze e appunti separati.')
      .addText(text => text
        .setValue(this.plugin.settings.draftBranch)
        .onChange(async (value) => {
          this.plugin.settings.draftBranch = value.trim() || 'draft';
          await this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName('Sincronizzazione Automatica all\'Avvio')
      .setDesc('Esegue automaticamente git pull dal branch corrente all\'apertura del vault se non ci sono modifiche pendenti.')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.autoPullOnStartup)
        .onChange(async (value) => {
          this.plugin.settings.autoPullOnStartup = value;
          await this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName('Salvaguardia alla Chiusura (Exit Guard)')
      .setDesc('Intercetta la chiusura di Obsidian e richiede di salvare/pushare se sono presenti modifiche non sincronizzate.')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.enableExitGuard)
        .onChange(async (value) => {
          this.plugin.settings.enableExitGuard = value;
          await this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName('Backup Automatico su Fresh Start')
      .setDesc('Crea una cartella di backup locale di sicurezza in .obsidian/backups/ prima di sovrascrivere il vault dal cloud.')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.createBackupOnFreshStart)
        .onChange(async (value) => {
          this.plugin.settings.createBackupOnFreshStart = value;
          await this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName('Controllo File di Grandi Dimensioni (>25MB)')
      .setDesc('Avvisa prima del commit se sono stati inseriti file pesanti che potrebbero rallentare il sync o essere rifiutati da GitHub.')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.warnOnLargeFiles)
        .onChange(async (value) => {
          this.plugin.settings.warnOnLargeFiles = value;
          await this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName('Prefisso Messaggio Commit Automatico')
      .setDesc('Prefisso usato per il messaggio di salvataggio automatico (seguito da data e ora).')
      .addText(text => text
        .setValue(this.plugin.settings.autoCommitPrefix)
        .onChange(async (value) => {
          this.plugin.settings.autoCommitPrefix = value;
          await this.plugin.saveSettings();
        })
      );

    new Setting(containerEl)
      .setName('Percorso Eseguibile Git (Opzionale)')
      .setDesc('Lascia vuoto per usare il comando "git" standard di sistema.')
      .addText(text => text
        .setPlaceholder('git')
        .setValue(this.plugin.settings.customGitPath)
        .onChange(async (value) => {
          this.plugin.settings.customGitPath = value.trim();
          await this.plugin.saveSettings();
        })
      );
  }
}

module.exports = QuartzGitManagerPlugin;
