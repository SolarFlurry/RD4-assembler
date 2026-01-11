import './assembler.css'

import { EditorView } from "codemirror";
import { Component } from "../components/component";
import { highlightActiveLine, lineNumbers } from "@codemirror/view";
import { parser } from "./highlight/parser";
import { foldGutter, HighlightStyle, LRLanguage, syntaxHighlighting } from "@codemirror/language";
import { styleTags, tags } from '@lezer/highlight';

const assemblyLangage = LRLanguage.define({
	parser: parser.configure({
		props: [
			styleTags({
				Comment: tags.lineComment,
				Instr: tags.operatorKeyword,
				Label: tags.labelName,
				Reg: tags.className,
				Number: tags.number,
				Char: tags.character,
			})
		]
	})
})

const myHighlightStyle = HighlightStyle.define([
	{ tag: tags.operatorKeyword, color: "#fc6" },
	{ tag: tags.lineComment, color: "rgba(95, 95, 95, 1)", fontStyle: "italic" },
	{ tag: tags.labelName, color: "#626dceff"},
	{ tag: tags.className, color: "#49d192ff" },
	{ tag: tags.number, color: "#a3d98aff" },
	{ tag: tags.character, color: "#bb7f51ff" },
])

const theme = EditorView.theme({
	"&": {
		backgroundColor: '#29292b',
		height: 'calc(100vh - 4rem)',
	},
	"& .cm-content": {
		fontFamily: "'Fira Code', monospace",
		fontVariantLigatures: "normal",
	},
	".cm-editor": {
		width: '100%',
		height: '100%',
	},
	".cm-content": {
		caretColor: 'var(--text)',
	},
	".cm-scroller": {
		overflow: 'auto',
	}
}, { dark: true })

export class CodeEditorComponent extends Component {
	view: EditorView;
	constructor() {
		super(null);

		this.view = new EditorView({
			extensions: [
				theme,
				assemblyLangage,
				syntaxHighlighting(myHighlightStyle),
				lineNumbers(),
			]
		})

		this.element = this.view.dom
	}
}