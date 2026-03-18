import { Component } from "../component";

export class HorizontalLayout extends Component {
	children: Component[]
	constructor(components: Component[], sizes: (number | string)[], css?: Partial<CSSStyleDeclaration>) {
		super(document.createElement('div'), css)

		this.element.style.display = 'grid';
		//this.element.style.justifyContent = 'space-around';
		this.element.style.height = "100%";

		this.children = components;
		for (const child of this.children) {
			this.element.appendChild(child.element);
		}
		this.element.style.gridTemplateColumns = sizes
			.reduce((prev, current) => prev + (typeof current == "number" ? current + "fr " : current + " "), "")
			.toString();
	}
}

export class VerticalLayout extends Component {
	children: Component[]
	constructor(components: Component[], sizes: (number | string)[], css?: Partial<CSSStyleDeclaration>) {
		super(document.createElement('div'), css)

		this.element.style.display = 'grid';
		//this.element.style.justifyContent = 'space-around';
		this.element.style.width = "100%";

		this.children = components;
		for (const child of this.children) {
			this.element.appendChild(child.element);
		}
		this.element.style.gridTemplateRows = sizes
			.reduce((prev, current) => prev + (typeof current == "number" ? current + "fr " : current + " "), "")
			.toString();
	}
}