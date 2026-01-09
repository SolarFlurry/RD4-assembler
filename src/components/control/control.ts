import { Component } from "../component";

export abstract class Control extends Component {
	child: Component;
	constructor(child: Component, css?: Partial<CSSStyleDeclaration>) {
		super(document.createElement('div'), css)
		this.child = child;
		this.element.appendChild(child.element);
	}
}

export class GreedyControl extends Control {
	constructor(child: Component, css?: Partial<CSSStyleDeclaration>) {
		super(child, css)
		this.element.style.width = "100%";
		this.element.style.height = "100%";
		this.child.element.style.width = "100%";
		this.child.element.style.height = "100%";
	}
}

export class PaddingControl extends Control {
	constructor(child: Component, padding: string, css?: Partial<CSSStyleDeclaration>) {
		super(child, css)
		this.element.style.padding = padding;
	}
}