import { addError } from "./errors";
import { Token, TokenKind } from "./lexer";

export interface Instruction {
    tok: Token,
    name: string,
    regs: [number, number, number],
    data: number,
}

let tokens: Token[];
let index: number = 0;

function advance() {
    index++;
}

function expect(kind: TokenKind) {
    if (tokens[index].kind == kind) {
        advance();
        return;
    }
    addError(tokens[index], `Unexpected "${tokens[index].lexeme}"`);
}

export function parse(inputTokens: Token[]): Instruction[] {
    tokens = inputTokens;
    index = 0;
    const instructions: Instruction[] = [];
    while (index < tokens.length) {
        if (tokens[index].kind == TokenKind.Eof) break;
        if (tokens[index].kind != TokenKind.Instruction) {
            addError(tokens[index], `Unexpected '${tokens[index].lexeme}', expected an instruction`);
            advance();
            continue;
        }
        instructions.push(parseInstruction());
    }

    return instructions;
}

function parseInstruction(): Instruction {
    const instr: Instruction = {
        tok: tokens[index],
        name: tokens[index].lexeme,
        regs: [0, 0, 0],
        data: 0,
    }
    expect(TokenKind.Instruction);
    let regsAdded = 0;
    for (let i = 0; i < 3; i++) {
        if (tokens[index].kind == TokenKind.Register) {
            regsAdded++;
            instr.regs[i] = parseInt(tokens[index].lexeme.slice(1));
            if (instr.regs[i] > 15) {
                addError(tokens[index], "Cannot have a register over 31");
            }
            advance();
        }
    }

    while (tokens[index].kind == TokenKind.Register) {
        advance();
        regsAdded++;
    }

    if (regsAdded > 3) {
        addError(instr.tok, "Cannot have over 3 registers attached to an instruction");
    }

    if (tokens[index].kind == TokenKind.Binary ||
        tokens[index].kind == TokenKind.Decimal ||
        tokens[index].kind == TokenKind.Hexadecimal
    ) {
        instr.data = parseNumber();
    };

    return instr;
}

function parseNumber(): number {
    const token = tokens[index];
    advance();

    switch (token.kind) {
        case TokenKind.Binary: return parseInt(token.lexeme.slice(2), 2);
        case TokenKind.Decimal: return parseInt(token.lexeme, 10);
        case TokenKind.Hexadecimal: return parseInt(token.lexeme.slice(2), 16);
    }
}