import { tokenise } from "./lexer";
import { parse } from "./parser";

export function compile(source: string) {
    const tokens = tokenise(source);
    const instrs = parse(tokens);
    console.log(instrs);
}