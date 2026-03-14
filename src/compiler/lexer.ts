export enum TokenKind {
    Binary,
    Decimal,
    Hexadecimal,
    Register,
    Instruction,
    Label,
    Eof,
    Error,
}

export interface Token {
    lexeme: string,
    kind: TokenKind,
}

function isDigit(char: string): boolean {
    return /^[0-9]$/i.test(char);
}

function isHexDigit(char: string): boolean {
    return /^[A-Fa-f0-9]$/i.test(char);
}

function isUpperAlpha(char: string): boolean {
    return /^[A-Z]$/i.test(char);
}

export function tokenise(source: string): Token[] {
    const tokens: Token[] = [];
    let i = 0;
    while (i < source.length) {
        const start = i;
        if (source[i] == ' ' || source[i] == '\n' || source[i] == '\t') {
            i++;
            continue;
        }
        if (source[i] == ';') {
            i++;
            while (source[i] != '\n' && i < source.length) i++;
            continue;
        }
        if (source[i] == '0') {
            switch (source[i + 1]) {
                case 'b': {
                    i += 2;
                    while (source[i] == '0' || source[i] == '1') i++;
                    tokens.push({
                        lexeme: source.slice(start, i),
                        kind: TokenKind.Binary,
                    })
                    continue;
                };
                case 'x': {
                    i += 2;
                    while (isHexDigit(source[i])) i++;
                    tokens.push({
                        lexeme: source.slice(start, i),
                        kind: TokenKind.Hexadecimal,
                    })
                    continue;
                };
            }
        }
        if (isDigit(source[i])) {
            while (isDigit(source[i]) && i < source.length) i++;
            tokens.push({
                lexeme: source.slice(start, i),
                kind: TokenKind.Decimal,
            })
            continue;
        }
        if (source[i] == 'r') {
            i++;
            while (isDigit(source[i]) && i < source.length) i++;
            tokens.push({
                lexeme: source.slice(start, i),
                kind: TokenKind.Register,
            })
            continue;
        }
        if (isUpperAlpha(source[i])) {
            while (isUpperAlpha(source[i]) && i < source.length) i++;
            tokens.push({
                lexeme: source.slice(start, i),
                kind: TokenKind.Instruction,
            })
            continue;
        }
        i++;
        tokens.push({
            lexeme: source.slice(start, i),
            kind: TokenKind.Error,
        })
    }

    tokens.push({
        lexeme: "eof",
        kind: TokenKind.Eof,
    })

    return tokens;
}