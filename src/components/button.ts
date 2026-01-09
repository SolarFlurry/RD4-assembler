import { Component } from "./component";

export class ButtonComponent extends Component {
	constructor(text: string, callback: (event: PointerEvent) => void) {
		super(document.createElement('div'));
		this.element.classList.add('button')
		this.element.innerText = text;
		this.element.addEventListener('click', callback);
	}
}