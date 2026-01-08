import './main.css'

export abstract class Component {
	element: HTMLElement
}

class Root extends Component {
	private children: Component[]
	constructor() {
		super();
		this.children = []
		this.element = document.createElement('div');
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