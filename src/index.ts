import { CodeEditorComponent } from "./assembler/codeEditor";
import { ErrorDisplayComponent } from "./assembler/errors";
import { compile } from "./compiler";
import { ButtonComponent } from "./components/button";
import { root } from "./components/component";
import { GreedyControl, PaddingControl } from "./components/control/control";
import { HorizontalLayout, VerticalLayout } from "./components/layout/layout";
import { MenuBar, MenuBarDivider, MenuBarItem, MenuBarOption } from "./components/menuBar";
import { TextComponent } from "./components/text";

const codeEditor = new CodeEditorComponent();
const errorList = new ErrorDisplayComponent();

function downloadBlob(blob: Blob, filename: string) {
	const a = document.createElement('a');
	a.href = URL.createObjectURL(blob);
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(a.href);
}

errorList.setText("No Errors");

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
			new PaddingControl(new VerticalLayout([
				new HorizontalLayout([
					new ButtonComponent("Compile", () => {
						const data = compile(codeEditor.view.state.doc.toString(), errorList);
						console.log("fine after");
						if (data == null) return;
						downloadBlob(
							new Blob([data.buffer as ArrayBuffer], { type: 'application/octet-stream' }),
							'instructions.mcstructure'
						)
					}),
					new ButtonComponent("Export", () => downloadBlob(
							new Blob([codeEditor.view.state.doc.toString()], { type: 'text/plain' }),
							"assembly.txt"
						)),
					new ButtonComponent("Load", () => { })
				], [1, 1, 1]),
				errorList,
			], ["3rem", "calc(100vh - 8rem)"], { height: "100%" }), "1rem")
		],
		[5, 2]
	)
)