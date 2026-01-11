import { CodeEditorComponent } from "./assembler/codeEditor";
import { ButtonComponent } from "./components/button";
import { root } from "./components/component";
import { GreedyControl, PaddingControl } from "./components/control/control";
import { HorizontalLayout } from "./components/layout/layout";
import { MenuBar, MenuBarDivider, MenuBarItem, MenuBarOption } from "./components/menuBar";
import { TextComponent } from "./components/text";

const codeEditor = new CodeEditorComponent();

root.setMenuBar(new MenuBar([
	new MenuBarItem('File', [
		new MenuBarOption("New", () => { }),
		new MenuBarOption("Open File", () => { }),
		new MenuBarDivider(),
		new MenuBarOption("Save As", () => { }),
		new MenuBarOption("Export", () => { })
	]),
	new MenuBarItem('Edit', [
		new MenuBarOption("Undo", () => { }),
		new MenuBarOption("Redo", () => { }),
		new MenuBarDivider(),
		new MenuBarOption("Cut", () => { }),
		new MenuBarOption("Copy", () => {
			const from = codeEditor.view.state.selection.main.from;
			const to = codeEditor.view.state.selection.main.to;
			const selectedText = codeEditor.view.state.sliceDoc(from, to);
			navigator.clipboard.writeText(selectedText)
		}),
		new MenuBarOption("Paste", () => { }),
	]),
	new MenuBarItem('Settings', []),
]))

root.add(
	new HorizontalLayout(
		[
			new PaddingControl(codeEditor, "1rem", { minWidth: '0' }),
			new PaddingControl(new HorizontalLayout([
				new ButtonComponent("Compile", () => { }),
				new ButtonComponent("Export", () => {
					const file = new Blob([codeEditor.view.state.doc.toString()], { type: 'text/plain' });
					const a = document.createElement('a');
					a.href = URL.createObjectURL(file);
					a.download = 'assembly.txt';
					document.body.appendChild(a);
					a.click();
					document.body.removeChild(a);
					URL.revokeObjectURL(a.href);
				}),
				new ButtonComponent("Load", () => { })
			], [1, 1, 1]), "1rem")
		],
		[
			6,
			2,
		]
	)
)