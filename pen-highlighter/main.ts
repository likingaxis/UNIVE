import { Plugin, MarkdownView, Menu, Editor, App, PluginSettingTab, Setting } from 'obsidian';

interface PenHighlighterSettings {
	requirePen: boolean;
}

const DEFAULT_SETTINGS: PenHighlighterSettings = {
	requirePen: true
}

export default class PenHighlighterPlugin extends Plugin {
	settings: PenHighlighterSettings;

	async onload() {
		await this.loadSettings();

		// Add settings tab
		this.addSettingTab(new PenHighlighterSettingTab(this.app, this));

		// Register a global pointerup event listener to catch interactions
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
		
		// 1. Bold (**)
		menu.addItem((item) => {
			item
				.setTitle('1. **ciao** (Grassetto)')
				.setIcon('bold-glyph')
				.onClick(() => {
					editor.replaceSelection(`**${selectedText}**`);
				});
		});
		
		// 2. Italic (*)
		menu.addItem((item) => {
			item
				.setTitle('2. *ciao* (Corsivo)')
				.setIcon('italic-glyph')
				.onClick(() => {
					editor.replaceSelection(`*${selectedText}*`);
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

	onunload() {
		// Obsidian automatically cleans up DOM event listeners registered with registerDomEvent
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
			.setName('Richiedi l\'uso della penna')
			.setDesc('Se attivato, il menu apparirà SOLO quando usi la penna. Se disattivato, apparirà anche selezionando il testo col dito o col mouse.')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.requirePen)
				.onChange(async (value) => {
					this.plugin.settings.requirePen = value;
					await this.plugin.saveSettings();
				}));
	}
}
