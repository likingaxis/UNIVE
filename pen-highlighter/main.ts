import { Plugin, MarkdownView, Menu, Editor, App, PluginSettingTab, Setting } from 'obsidian';
import { Prec, Extension } from '@codemirror/state';
import { keymap, EditorView } from '@codemirror/view';

interface PenHighlighterSettings {
	requirePen: boolean;
	enableShortcuts: boolean;
}

const DEFAULT_SETTINGS: PenHighlighterSettings = {
	requirePen: true,
	enableShortcuts: true
}

export default class PenHighlighterPlugin extends Plugin {
	settings: PenHighlighterSettings;

	async onload() {
		await this.loadSettings();

		// Add settings tab
		this.addSettingTab(new PenHighlighterSettingTab(this.app, this));

		// Register native CodeMirror 6 extension with highest precedence for keys 1, 2, 3
		this.registerEditorExtension(this.buildKeymapExtension());

		// Register global pointerup event listener for pen/touch selection popup
		this.registerDomEvent(document, 'pointerup', (evt: PointerEvent) => {
			// Activate only if the input device is a pen, unless the setting is disabled
			if (this.settings.requirePen && evt.pointerType !== 'pen') {
				return;
			}
			
			// Wait a tiny bit for the text selection to finalize
			setTimeout(() => {
				this.handleSelection(evt);
			}, 50);
		});

		// Register commands in Obsidian command palette
		this.addCommand({
			id: 'format-italic-1',
			name: 'Formatta selezione: * (Corsivo)',
			editorCallback: (editor: Editor) => {
				const selection = editor.getSelection();
				if (selection && selection.trim() !== '') {
					editor.replaceSelection(`*${selection}*`);
				}
			}
		});

		this.addCommand({
			id: 'format-bold-2',
			name: 'Formatta selezione: ** (Grassetto)',
			editorCallback: (editor: Editor) => {
				const selection = editor.getSelection();
				if (selection && selection.trim() !== '') {
					editor.replaceSelection(`**${selection}**`);
				}
			}
		});

		this.addCommand({
			id: 'format-bold-italic-3',
			name: 'Formatta selezione: *** (Grassetto e Corsivo)',
			editorCallback: (editor: Editor) => {
				const selection = editor.getSelection();
				if (selection && selection.trim() !== '') {
					editor.replaceSelection(`***${selection}***`);
				}
			}
		});
	}

	buildKeymapExtension(): Extension {
		const formatSelection = (view: EditorView, delimiter: string): boolean => {
			if (!this.settings.enableShortcuts) return false;
			
			const { state } = view;
			const { from, to, empty } = state.selection.main;
			if (empty) return false; // Nessuna selezione attiva: CodeMirror digiterà normalmente il numero

			const selectedText = state.sliceDoc(from, to);
			if (!selectedText || selectedText.trim() === '') return false;

			const replacement = `${delimiter}${selectedText}${delimiter}`;
			view.dispatch({
				changes: { from, to, insert: replacement },
				selection: { anchor: from, head: from + replacement.length }
			});
			return true; // Gestito con successo: CodeMirror NON digiterà il numero
		};

		return Prec.highest(
			keymap.of([
				{
					key: '1',
					run: (view: EditorView) => formatSelection(view, '*')
				},
				{
					key: '2',
					run: (view: EditorView) => formatSelection(view, '**')
				},
				{
					key: '3',
					run: (view: EditorView) => formatSelection(view, '***')
				}
			])
		);
	}

	handleSelection(evt: PointerEvent) {
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (!view) return;

		const editor = view.editor;
		const selection = editor.getSelection();
		
		// If no text is selected, do nothing
		if (!selection || selection.trim() === '') {
			return; 
		}

		// Coordinates for the popup menu based on where the pointer was lifted
		const x = evt.clientX;
		const y = evt.clientY;

		// Create and show our native Obsidian popup menu
		this.showFormattingMenu(editor, selection, x, y);
	}
	
	showFormattingMenu(editor: Editor, selectedText: string, x: number, y: number) {
		const menu = new Menu();
		
		// 1. Italic (*)
		menu.addItem((item) => {
			item
				.setTitle('1. *ciao* (Corsivo)')
				.setIcon('italic-glyph')
				.onClick(() => {
					editor.replaceSelection(`*${selectedText}*`);
				});
		});

		// 2. Bold (**)
		menu.addItem((item) => {
			item
				.setTitle('2. **ciao** (Grassetto)')
				.setIcon('bold-glyph')
				.onClick(() => {
					editor.replaceSelection(`**${selectedText}**`);
				});
		});
		
		// 3. Bold + Italic (***)
		menu.addItem((item) => {
			item
				.setTitle('3. ***ciao*** (Grassetto e Corsivo)')
				.setIcon('highlighter')
				.onClick(() => {
					editor.replaceSelection(`***${selectedText}***`);
				});
		});

		menu.showAtPosition({ x, y });
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class PenHighlighterSettingTab extends PluginSettingTab {
	plugin: PenHighlighterPlugin;

	constructor(app: App, plugin: PenHighlighterPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Richiedi l\'uso della penna per il Menu')
			.setDesc('Se attivato, il menu a comparsa apparirà SOLO quando usi la penna. Se disattivato, apparirà anche selezionando il testo col dito o col mouse.')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.requirePen)
				.onChange(async (value) => {
					this.plugin.settings.requirePen = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Scorciatoie numeriche (1, 2, 3)')
			.setDesc('Permette di formattare il testo selezionato premendo 1 (*), 2 (**), 3 (***) sulla tastiera. Se non c\'è testo selezionato, i numeri vengono digitati normalmente.')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.enableShortcuts)
				.onChange(async (value) => {
					this.plugin.settings.enableShortcuts = value;
					await this.plugin.saveSettings();
				}));
	}
}
