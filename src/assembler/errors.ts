import { Component } from "../components/component";

export class ErrorDisplayComponent extends Component {
    constructor() {
        super(document.createElement("div"), {
            whiteSpace: "pre",
            padding: "5px",
            backgroundColor: "#29292b",
            color: "var(--text)",
            fontFamily: "'Fira Code', monospace",
            fontWeight: "200",
            overflow: "auto",
        });
        this.element.setAttribute("readonly", "true");
        this.element.setAttribute("wrap", "off");
    }
    public setText(text: string) {
        this.element.innerHTML = text;
    }
}