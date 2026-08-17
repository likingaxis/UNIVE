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
  warnOnLargeFiles: true
};

// ==========================================================
// GIT SERVICE
// ==========================================================
class GitService {
  constructor(plugin) {
    this.plugin = plugin;
  }

  get vaultPath() {
    return this.plugin.app.vault.adapter.basePath || '.';
  }

  get gitPath() {
    return this.plugin.settings.customGitPath.trim() || 'git';
  }

  execGit(args, options = {}) {
    return new Promise((resolve) => {
      const gitCmd = this.gitPath;
      const cwd = this.vaultPath;

      execFile(
        gitCmd,
        args,
        {
          cwd,
          timeout: options.timeout || 30000,
          env: { ...process.env, LANG: 'en_US.UTF-8', LC_ALL: 'en_US.UTF-8' }
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

  async getStatus() {
    const branch = await this.getCurrentBranch();
    const res = await this.execGit(['status', '--porcelain', '-b']);
    
    if (!res.success) {
      return {
        success: false,
        branch,
        isClean: false,
        ahead: 0,
        behind: 0,
        files: [],
        hasConflicts: false,
        largeFiles: [],
        rawError: res.stderr || res.error
      };
    }

    const lines = res.stdout.split('\n').map(l => l.trimEnd()).filter(Boolean);
    let ahead = 0;
    let behind = 0;
    let hasConflicts = false;
    const files = [];
    const largeFiles = [];

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
            const fullPath = path.join(this.vaultPath, filePath);
            if (fs.existsSync(fullPath)) {
              const stat = fs.statSync(fullPath);
              const sizeMb = (stat.size / (1024 * 1024)).toFixed(1);
              if (stat.size > 25 * 1024 * 1024) {
                largeFiles.push({ path: filePath, sizeMb });
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
      largeFiles,
      rawError: null
    };
  }

  async getRecentCommits(limit = 6) {
    const res = await this.execGit(['log', '--oneline', '--decorate', `-${limit}`]);
    if (!res.success) return [];
    return res.stdout.split('\n').filter(Boolean);
  }

  async getAvailableBranches() {
    const res = await this.execGit(['branch', '-a']);
    if (!res.success) return [];
    return res.stdout.split('\n').map(b => b.replace('*', '').trim()).filter(Boolean);
  }

  async fetch() {
    return await this.execGit(['fetch', 'origin']);
  }

  async pull(branch) {
    return await this.execGit(['pull', 'origin', branch]);
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

  async commitAndPush(message, branch) {
    const addRes = await this.execGit(['add', '.']);
    if (!addRes.success) {
      return { success: false, step: 'git add', error: addRes.stderr || addRes.error };
    }

    const commitRes = await this.execGit(['commit', '-m', message]);
    if (!commitRes.success) {
      // Se non c'erano modifiche da committare ma ci sono commit pendenti
      if (commitRes.stdout.includes('nothing to commit') || commitRes.stderr.includes('nothing to commit')) {
        // ok, procediamo al push
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

  formatError(errText) {
    if (!errText) return 'Errore sconosciuto durante l\'operazione Git.';
    if (errText.includes('Could not resolve host') || errText.includes('Failed to connect') || errText.includes('Network is unreachable')) {
      return '🌐 <b>Dispositivo Offline</b>: Connessione a GitHub non disponibile. Le modifiche rimangono salvate in locale sul tuo PC.';
    }
    if (errText.includes('Automatic merge failed') || errText.includes('conflict')) {
      return '🛑 <b>Conflitto di Merge</b>: Sono presenti modifiche contrastanti tra locale e remoto. Risolvi i file in conflitto prima di procedere.';
    }
    if (errText.includes('Permission denied') || errText.includes('Authentication failed')) {
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
        return; // Permetti chiusura
      }

      event.preventDefault();
      event.returnValue = '';

      if (this.isCheckingExit) return;
      this.isCheckingExit = true;

      this.git.getStatus().then((status) => {
        if (status.isClean && (!status.ahead || status.ahead === 0)) {
          // Tutto pulito e sincronizzato
          this.isClosing = true;
          window.close();
        } else {
          // Modifiche locali o commit in sospeso
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
        attr: { title: `${status.behind} commit da scaricare dal server (esegui pull)` }
      });
    }

    if (status.ahead > 0) {
      this.statusBarEl.createEl('span', {
        text: ` ↑${status.ahead}`,
        cls: 'qgm-badge-draft',
        attr: { title: `${status.ahead} commit locali non ancora inviati` }
      });
    }

    if (status.hasConflicts) {
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

    if (!status.isClean) {
      new Notice(`⚠️ [Git Sync] Rilevate ${status.files.length} modifiche locali. Pull all'avvio sospeso per proteggere il tuo lavoro locale.`, 8000);
      return;
    }

    if (status.hasConflicts) {
      new Notice(`🛑 [Git Sync] ATTENZIONE: Sono presenti file in conflitto non risolti!`, 10000);
      return;
    }

    new Notice(`🔄 [Git Sync] Controllo aggiornamenti su origin/${status.branch}...`, 2500);
    const pullRes = await this.git.pull(status.branch);

    if (pullRes.success) {
      if (pullRes.stdout.includes('Already up to date')) {
        new Notice(`✅ [Git Sync] Vault aggiornato (${status.branch}).`, 3000);
      } else {
        new Notice(`📥 [Git Sync] Nuove note scaricate con successo da origin/${status.branch}!`, 6000);
      }
      this.refreshStatusBar();
    } else {
      const formatted = this.git.formatError(pullRes.stderr || pullRes.error);
      new Notice(`⚠️ [Git Sync] Sincronizzazione all'avvio non riuscita:\n${pullRes.stderr || pullRes.error}`, 9000);
    }
  }

  async executePull() {
    const branch = await this.git.getCurrentBranch();
    new Notice(`🔄 [Git Sync] Pull da origin/${branch} in corso...`);
    const pullRes = await this.git.pull(branch);

    if (pullRes.success) {
      new Notice(`✅ [Git Sync] Pull completato su ${branch}!`);
      this.refreshStatusBar();
    } else {
      new Notice(`❌ [Git Sync] Errore durante il pull:\n${pullRes.stderr || pullRes.error}`, 10000);
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

    // Avviso Conflitti
    if (status.hasConflicts) {
      const conflictBox = contentEl.createEl('div', { cls: 'qgm-alert qgm-alert-danger' });
      conflictBox.innerHTML = '🛑 <b>CONFLITTO DI MERGE RILEVATO</b>: Ci sono note con conflitti non risolti. Apri i file contrassegnati e rimuovi i marcatori di conflitto prima di sincronizzare.';
    }

    // Avviso Remote Ahead (Behind)
    if (status.behind > 0) {
      const behindBox = contentEl.createEl('div', { cls: 'qgm-alert qgm-alert-warning' });
      behindBox.innerHTML = `⚠️ <b>Repository Remoto più Recente</b>: Ci sono <b>${status.behind} commit</b> sul server da scaricare.<br>💡 <i>Consiglio: Esegui prima un <b>Pull</b> per evitare divergenze.</i>`;
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
    row4.createEl('span', { text: 'Sincronizzazione Server:', cls: 'qgm-info-label' });
    if (status.ahead === 0 && status.behind === 0) {
      row4.createEl('span', { text: '✅ Perfettamente allineato con origin', cls: 'qgm-info-value' });
    } else {
      row4.createEl('span', {
        text: `${status.ahead > 0 ? `↑ ${status.ahead} commit da inviare  ` : ''}${status.behind > 0 ? `↓ ${status.behind} commit da scaricare` : ''}`,
        cls: 'qgm-info-value'
      });
    }

    // Bottoni Azioni
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
      .setDesc('Crea un commit e carica le modifiche sul server')
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

    const status = await this.plugin.git.getStatus();
    const draft = this.plugin.settings.draftBranch;
    const prod = this.plugin.settings.defaultBranch;

    contentEl.createEl('div', {
      text: `Branch corrente: ${status.branch}`,
      cls: 'qgm-info-card'
    });

    if (!status.isClean) {
      const alertBox = contentEl.createEl('div', { cls: 'qgm-alert qgm-alert-warning' });
      alertBox.innerHTML = `⚠️ <b>Modifiche locali non salvate (${status.files.length} file)</b>.<br>Cambiare branch con modifiche pendenti potrebbe causare conflitti. Si raccomanda di committare prima di cambiare branch.`;
    }

    const switchContainer = contentEl.createEl('div', { cls: 'qgm-actions-list' });

    // Scelta Draft
    new Setting(switchContainer)
      .setName(`🌿 Branch: ${draft}`)
      .setDesc('Branch di lavoro per appunti e bozze')
      .addButton(btn => btn
        .setButtonText(status.branch === draft ? 'Sei già qui' : `Passa a ${draft}`)
        .setDisabled(status.branch === draft)
        .onClick(async () => {
          await this.performSwitch(draft);
        })
      );

    // Scelta Default/Main
    new Setting(switchContainer)
      .setName(`🌿 Branch: ${prod}`)
      .setDesc('Branch principale del repository')
      .addButton(btn => btn
        .setButtonText(status.branch === prod ? 'Sei già qui' : `Passa a ${prod}`)
        .setDisabled(status.branch === prod)
        .onClick(async () => {
          await this.performSwitch(prod);
        })
      );

    const btnGroup = contentEl.createEl('div', { cls: 'qgm-button-group' });
    btnGroup.createEl('button', { text: 'Chiudi' }).addEventListener('click', () => this.close());
  }

  async performSwitch(targetBranch) {
    this.close();
    new Notice(`🔄 Recupero info da origin e passaggio a ${targetBranch}...`, 3000);
    
    await this.plugin.git.fetch();
    const switchRes = await this.plugin.git.switchBranch(targetBranch);

    if (switchRes.success) {
      new Notice(`✅ Ora sei sul branch ${targetBranch}!`, 4000);
      this.plugin.refreshStatusBar();

      const pullRes = await this.plugin.git.pull(targetBranch);
      if (pullRes.success && !pullRes.stdout.includes('Already up to date')) {
        new Notice(`📥 Branch ${targetBranch} sincronizzato con le ultime modifiche remote!`, 5000);
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
