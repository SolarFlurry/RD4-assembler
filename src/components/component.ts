import './main.css'

export abstract class Component {
	element: HTMLElement
	constructor(element: HTMLElement, css?: Partial<CSSStyleDeclaration>) {
		this.element = element;
		if (css) {
			for (const key of Object.keys(css)) {
				this.element.style[key as any] = css[key as any];
			}
		}
	}
}

class Root extends Component {
	private children: Component[]
	constructor() {
		super(document.createElement('div'));
		this.children = []
		this.element.style
		this.element.id = "root"
		document.body.appendChild(this.element);
	}
	public add(component: Component) {
		this.children.push(component);
		this.element.appendChild(component.element)
	}
	*[Symbol.iterator](): Generator<Component, void, void> {
		for (const component of this.children) {
			yield component;
		}
	}
}

export const root = new Root();