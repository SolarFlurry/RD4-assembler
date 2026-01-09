import { Component } from "./component";

export class TextComponent extends Component {
	constructor(text: string) {
		super(document.createElement('p'))
		this.element.innerText = text;
	}
}