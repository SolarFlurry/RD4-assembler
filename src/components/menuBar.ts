import '../css/menubar.css'

export abstract class MenuBarWidget {
	element: HTMLElement;
}

export class MenuBarOption extends MenuBarWidget {
	constructor(text: string, callback: (event: PointerEvent) => void) {
		super();
		this.element = document.createElement('div');
		this.element.classList.add('submenu-option')
		this.element.innerText = text;
		this.element.addEventListener('click', callback)
	}
}

export class MenuBarDivider extends MenuBarWidget {
	constructor() {
		super();
		this.element = document.createElement('div');
		this.element.classList.add('submenu-divider')
	}
}

export class MenuBarItem {
	element: HTMLElement;
	options: MenuBarOption[]
	constructor(text: string, options: MenuBarOption[]) {
		this.element = document.createElement('div')
		this.options = options;

		const span = document.createElement('span')
		span.innerText = text
		this.element.appendChild(span)

		const submenu = document.createElement('submenu')
		options.forEach((option) => submenu.appendChild(option.element))
		submenu.classList.add('submenu')
		this.element.appendChild(submenu)

		this.element.classList.add('menu-bar-item')
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