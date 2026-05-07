import { BlockType, MCStructure, Vec3 } from "mcstructs";
import { addError } from "./errors";
import { Instruction } from "./parser";

function instrToHex(instr: string): [number, number] | null{
    const index = [
        "ADD",
        "SUB",
        "OR",
        "NOR",
        "AND",
        "XOR",
        "XNOR",
        "RSH",
        "LL1",
        "LL2",
        "LL3",
        "LL4",
        "JMP",
        "ZRO",
        "OVF",
        "GRT",
        "LES",
        "EQU",
        "DRL1",
        "LDI",
        "RRD",
        "RWR",
        "PRD",
        "PWR",
        "CAL",
        "RET",
        "DRLN",
        "RSSC",
        "BFWR",
        "UPDC",
        "HLT",
    ].findIndex((value) => value == instr);

    if (index == -1) return null;

    return [
        Math.floor(index / 16),
        index % 16,
    ];
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
        if (instrHex == null) {
            addError(instr.tok, `No instruction named "${instr.name}"`);
            continue;
        }
        const data = intToHexArray(instr.data, 4);
        hex.push(...instrHex, ...data.slice(0, 3), data[3] | instr.regs[2], instr.regs[0], instr.regs[1]);
    }

    return Uint8Array.from(hex);
}

export function writeMcStructure(hex: Uint8Array): Int8Array {
    const structure = new MCStructure(new Vec3(62, 16, Math.ceil(hex.length / 512) * 4));

    const paletteIndex = structure.paletteAdd(new BlockType("minecraft:barrel"))

    let index = 0;
    outest: for (let i = 0; i < Math.ceil(hex.length / 512); i++) {
        for (let j = 0; j < 31; j ++) {
            for (let k = 0; k < 8; k ++) {
                if (index >= hex.length) {
                    structure.setBlockPalette(new Vec3(j * 2, k * 2, i * 4), paletteIndex);
                    continue;
                }
                let itemsRequired = Math.max(hex[index], Math.ceil((27 * 64 / 14) * (hex[index] - 1)))
                const block = structure.setBlockPalette(new Vec3(j * 2, k * 2, i * 4), paletteIndex)
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

    return structure.asBytes();
}
