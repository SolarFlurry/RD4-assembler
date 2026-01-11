import '../css/menubar.css'

export class MenuBarOption {
	element: HTMLElement;
	constructor(text: string) {
		this.element = document.createElement('div');
		this.element.innerText = text;
	}
}

export class MenuBarItem {
	element: HTMLElement;
	options: MenuBarOption[]
	constructor(text: string, options: MenuBarOption[] | ((event: PointerEvent) => void)) {
		this.element = document.createElement('div')
		this.element.innerText = text;
		this.element.classList.add('menu-bar-item')
		if (Array.isArray(options)) {
			this.options = options
			for (const option of this.options) {
				this.element.appendChild(option.element);
			}
		} else {
			this.element.addEventListener('click', options)
		}
	}
}

export class MenuBar {
	items: MenuBarItem[]
	element: HTMLElement
	constructor(items: MenuBarItem[]) {
		this.element = document.createElement('div')
		this.element.classList.add('menu-bar')
		this.items = items;
		for (const item of this.items) {
			this.element.appendChild(item.element);
		}
	}
}