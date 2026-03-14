import { Token, TokenKind } from "./lexer";

export interface Instruction {
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
    }
    // error somehow
}

export function parse(inputTokens: Token[]): Instruction[] {
    tokens = inputTokens;
    const instructions: Instruction[] = [];
    while (index < tokens.length) {
        if (tokens[index].kind == TokenKind.Eof) break;
        instructions.push(parseInstruction());
    }

    return instructions;
}

function parseInstruction(): Instruction {
    const instr: Instruction = {
        name: tokens[index].lexeme,
        regs: [0, 0, 0],
        data: 0,
    }
    expect(TokenKind.Instruction);
    for (let i = 0; i < 3; i++) {
        if (tokens[index].kind == TokenKind.Register) {
            instr.regs[i] = parseInt(tokens[index].lexeme.slice(1));
            advance();
        }
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