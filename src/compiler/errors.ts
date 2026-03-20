import { ErrorDisplayComponent } from "../assembler/errors";
import { Token } from "./lexer";

interface Error {
    tok: Token,
    message: string,
}

let errors: Error[] = [];

export function errorsNum(): number { return errors.length }

export function addError(tok: Token, message: string) {
    errors.push({tok, message})
}

export function clearErrors() {
    errors = [];
}

function getSourceLoc(source: string, loc: { start: number, end: number }): {
    contents: string,
    lineIndex: number,
    lineOffset: number,
} {
    let index = 0;
    let lineNum = 0;
    for (const line of source.split("\n")) {
        index += line.length + 1;
        if (index > loc.start) return {
            contents: line,
            lineIndex: lineNum,
            lineOffset: line.length - (index - loc.start) + 1,
        };
        lineNum += 1;
    }
}

export function outputErrors(source: string, display: ErrorDisplayComponent) {
    display.setText(
        `Compilation ${
            errors.length == 0 ?
                "successful" : 
            errors.length == 1 ?
                `failed with 1 error:` :
                `failed with ${errors.length} errors:`}` +
        errors.reduce((prev, error) => {
            const sourceLoc = getSourceLoc(source, error.tok.loc);
            return prev + `

<span style="color:red;">[Error]</span> ${error.message}
  -> loc ${sourceLoc.lineIndex + 1}:${sourceLoc.lineOffset}
 ${(sourceLoc.lineIndex + 1).toString().padStart(4, ' ')} | ${sourceLoc.contents}
        ${' '.repeat(sourceLoc.lineOffset)}<span style="color:green">${'^'.repeat(error.tok.loc.end - error.tok.loc.start)}\
 Error occurred here</span>`
        }, "")
    )
}