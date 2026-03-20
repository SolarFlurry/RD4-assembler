import { ErrorDisplayComponent } from "../assembler/errors";
import { codegen, writeMcStructure } from "./codegen";
import { clearErrors, errorsNum, outputErrors } from "./errors";
import { tokenise } from "./lexer";
import { parse } from "./parser";

export function compile(source: string, display: ErrorDisplayComponent): Int8Array | null {
    clearErrors();

    const tokens = tokenise(source);
    console.log(tokens);

    const instrs = parse(tokens);
    console.log(instrs);

    const hex = codegen(instrs);
    console.log(hex);
    outputErrors(source, display);

    if (errorsNum() > 0) return null;

    return writeMcStructure(hex);
}