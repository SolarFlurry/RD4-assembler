import { Component } from "../component";

export abstract class Control extends Component {
	child: Component;
	constructor(child: Component) {
		super()
		this.element = document.createElement('div');
		this.child = child;
		this.element.appendChild(child.element);
	}
}

export class GreedyControl extends Control {
	constructor(child: Component) {
		super(child)
		this.element.style.width = "100%";
		this.element.style.height = "100%";
		this.child.element.style.width = "100%";
		this.child.element.style.height = "100%";
	}
}

export class PaddingControl extends Control {
	constructor(child: Component, padding: string) {
		super(child)
		this.element.style.padding = padding;
	}
}