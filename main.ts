import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

export default class MyPlugin extends Plugin {
	async onload() {
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'reindex-footnotes-baked',
			name: 'Redindex footnote',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				editor.replaceLines((line, text) => {
					let ft_index = 0;
					text.replaceAll(/^\[\^\S+?]: /gm, function(match, offset) {
						ft_index++;
						const newValue = '[^' + String(ft_index) + ']: ';
						editor.relaceRange(newValue, { line, ch: offset }, { line, ch: offset + newValue.length } );
					});
			
					ft_index = 0;
					text.replaceAll(/(?!^)\[\^\S+?]/gm, function(match, offset) {
						ft_index++;
						const newValue =  '[^' + String(ft_index) + ']';
						editor.relaceRange(newValue, { line, ch: offset }, { line, ch: offset + newValue.length } );
					});
				}, () => {});
			}
		});

	}
}
