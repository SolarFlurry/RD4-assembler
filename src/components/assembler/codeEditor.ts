import { Component } from "../component";
import './assembler.css'

export class badcodeeditor extends Component {
	constructor() {
		super()
		this.element = document.createElement('textarea');
		this.element.setAttribute('spellcheck', "false");
		this.element.classList.add("code-editor")
		this.element.style.whiteSpace = 'pre'
		this.element.style.overflowX = 'auto'
	}
}

export class CodeEditorComponent extends Component {
	element: HTMLCanvasElement
	text: string;
	typeIndex: number;
	isFocused: boolean;
	constructor() {
		super()
		this.typeIndex = 0;
		this.element = document.createElement('canvas');
		const ctx = this.element.getContext('2d');
		const computedStyles = window.getComputedStyle(this.element);

		const dpr = window.devicePixelRatio || 1;

		this.text = "";
		window.addEventListener('click', (event) => {
			if (document.elementFromPoint(event.x, event.y) === this.element) {
				this.isFocused = true;
			} else {
				this.isFocused = false;
			}
		})
		window.addEventListener('keydown', (event) => {
			if (!this.isFocused) return;
			switch (event.key) {
				case "ArrowRight": this.typeIndex += 1; break;
				case "ArrowLeft": this.typeIndex -= 1; break;
				case "Enter": {
					const part1 = this.text.slice(0, this.typeIndex);
					const part2 = this.text.slice(this.typeIndex);
					this.text = part1 + '\n' + part2;
					this.typeIndex++;
				} break;
				case "Backspace": {
					this.typeIndex--;
					this.text = this.text.slice(0, this.typeIndex) + this.text.slice(this.typeIndex + 1)
				}
				default: if (event.key.length === 1) {
					const part1 = this.text.slice(0, this.typeIndex);
					const part2 = this.text.slice(this.typeIndex);
					this.text = part1 + event.key + part2;
					this.typeIndex++;
				}
			}
			this.typeIndex = Math.min(Math.max(this.typeIndex, 0), this.text.length)
		})
		const frame = (time: DOMHighResTimeStamp) => {
			this.element.width = this.element.clientWidth * dpr;
			this.element.height = this.element.clientHeight * dpr;

			ctx.scale(dpr, dpr)

			ctx.fillStyle = '#29292b';
			ctx.fillRect(0, 0, this.element.width, this.element.height);

			const pxSize = parseFloat(computedStyles.fontSize);

			ctx.fillStyle = computedStyles.getPropertyValue('--text').trim();
			ctx.font = '1em "Fira Code"';

			let j = 0;
			let i = 0;
			for (const line of this.text.split('\n')) {
				ctx.fillText(i.toString().padEnd(5, ' ') + line, 0, (i+1) * (pxSize + 5));
				if (this.typeIndex - j >= 0 && this.typeIndex - j <= line.length && this.isFocused && time % 1200 < 600) {
					ctx.fillRect((this.typeIndex - j + 5) * 9.5, i * (pxSize + 5) + 2 , 1, pxSize + 6);
				}
				j += line.length + 1;
				i ++;
			}

			window.requestAnimationFrame(frame);
		}
		window.requestAnimationFrame(frame);
	}
}