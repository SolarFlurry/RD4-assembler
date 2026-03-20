import { BlockType, MCStructure, Vec3 } from "mcstructs";
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

function intToHexArray(num: number, hexits: number): number[] {
    if (!Number.isInteger(num)) return [0, 0, 0, 0];

    const nums: number[] = [];

    let acc = Math.abs(num);
    for (let i = 0; i < hexits; i++) {
        nums.push(acc % 16);
        acc = Math.floor(acc / 16);
    }

    return nums;
}

export function codegen(instrs: Instruction[]): Uint8Array {
    const hex: number[] = [];

    for (const instr of instrs) {
        const instrHex = instrToHex(instr.name);
        if (instrHex == -1) {
            addError(instr.tok, `No instruction named "${instr.name}"`);
            continue;
        }
        hex.push(instrHex, ...intToHexArray(instr.data, 4),...instr.regs);
    }

    return Uint8Array.from(hex);
}

export function writeMcStructure(hex: Uint8Array): Int8Array {
    const structure = new MCStructure(new Vec3(64, 16, Math.ceil(hex.length / 512) * 4));

    let index = 0;
    outest: for (let i = 0; i < Math.ceil(hex.length / 512); i++) {
        for (let j = 0; j < 32; j ++) {
            for (let k = 0; k < 8; k ++) {
                if (index >= hex.length) break outest;

                let itemsRequired = Math.max(hex[index], Math.ceil((27 * 64 / 14) * (hex[index] - 1)))
                const block = structure.setBlock(new Vec3(j * 2, k * 2, i * 4), new BlockType("minecraft:barrel"))
                for (let itemSlot = 0; itemsRequired != 0; itemSlot += 1) {
                    if (itemsRequired < 64) {
                        block.setItemSlot(itemSlot, "minecraft:redstone", itemsRequired);
                        break;
                    }
                    block.setItemSlot(itemSlot, "minecraft:redstone", 64);
                    itemsRequired -= 64;
                }

                index++;
            }
        }
    }

    console.log("fine before");
    return structure.asBytes();
}