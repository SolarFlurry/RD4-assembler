import { ErrorDisplayComponent } from "../assembler/errors";
import { codegen } from "./codegen";
import { clearErrors, outputErrors } from "./errors";
import { tokenise } from "./lexer";
import { parse } from "./parser";

export function compile(source: string, display: ErrorDisplayComponent) {
    clearErrors();

    const tokens = tokenise(source);
    console.log(tokens);

    const instrs = parse(tokens);
    console.log(instrs);

    const hex = codegen(instrs);
    console.log(hex);
    outputErrors(source, display);
}