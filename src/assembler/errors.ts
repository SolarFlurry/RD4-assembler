import { Component } from "../components/component";

export class ErrorListComponent extends Component {
    constructor() {
        super(document.createElement("textarea"), {
            resize: "none",
            border: "none",
            backgroundColor: "#29292b",
            color: "var(--text)",
            fontFamily: "'Fira Code', monospace",
            fontWeight: "200",
        });
        this.element.setAttribute("readonly", "true");
        this.element.setAttribute("wrap", "off");
    }
    public setText(text: string) {
        this.element.innerHTML = text;
    }
}