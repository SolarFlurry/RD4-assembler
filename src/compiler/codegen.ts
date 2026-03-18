import { addError } from "./errors";
import { Instruction } from "./parser";

function instrToHex(instr: string): number {
    return [
        "ADD",
        "XOR",
        "OR",
        "NOR",
        "AND",
        "XNOR",
        "SUB",
        "RET",
        "LDL",
        "CAL",
        "OVF",
        "RWR",
        "RRD",
        "PRR",
        "PWR",
    ].findIndex((value) => value == instr);
}

export function codegen(instrs: Instruction[]): Uint8Array {
    const hex: number[] = [];

    for (const instr of instrs) {
        const instrHex = instrToHex(instr.name);
        if (instrHex == -1) {
            addError(instr.tok, `No instruction named "${instr.name}"`);
            continue;
        }
        hex.push(instrHex, instr.data, ...instr.regs);
    }

    return Uint8Array.from(hex);
}