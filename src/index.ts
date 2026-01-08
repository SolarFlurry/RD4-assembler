import { badcodeeditor, CodeEditorComponent } from "./components/assembler/codeEditor";
import { ButtonComponent } from "./components/button";
import { root } from "./components/component";
import { GreedyControl, PaddingControl } from "./components/control/control";
import { HorizontalLayout } from "./components/layout/layout";
import { TextComponent } from "./components/text";

root.add(
	new HorizontalLayout(
	[
		new PaddingControl(new GreedyControl(new badcodeeditor()), "1rem"),
		new PaddingControl(new HorizontalLayout([
			new ButtonComponent("Compile", () => {}),
			new ButtonComponent("Settings", () => {})
		], [1, 1]), "1rem")
	],
	[
		6,
		2,
	]
))