const _ = require('lodash');
const chalk = require('chalk');
const assert = require('assert');
const INPUT = require('fs')
    .readFileSync('./input', 'utf8')
    .split(',')
    .map(n => parseInt(n, 10));

/**
 * Opcodes:
 * [XXX01, n, m, r] = PLUS.
 * [XXX02, n, m, r] = MULTIPLY.
 * [XXX03, n]       = Store INPUT
 * [XXX04, n]       = OUTPUT value
 * [99]             = halt execution
 *
 * Modes:
 * ABCDE
 *  1002
 *
 * DE - two-digit opcode,      02 == opcode 2
 * C - mode of 1st parameter,  0 == position mode
 * B - mode of 2nd parameter,  1 == immediate mode
 * A - mode of 3rd parameter,  0 == position mode,
 *                                  omitted due to being a leading zero
 */

const ParamModes = {
    POSITION: '0', // pointer
    IMMEDIATE: '1', // raw value
};

const Opcodes = {
    ADD: '01',
    MULTIPLY: '02',
    WRITE: '03',
    OUTPUT: '04',
    JUMP_IF_TRUE: '05', // JE
    JUMP_IF_FALSE: '06', // JNE
    LESS_THAN: '07',
    EQUALS: '08',
    HALT: '99',
};

const getValue = (tape, pos, mode) => {
    if (mode === ParamModes.POSITION) {
        return tape[tape[pos]];
    } else if (mode === ParamModes.IMMEDIATE) {
        return tape[pos];
    }

    throw new Error(`could not interpret mode: ${mode}`);
};

const PROGRAM_INPUT = 5;

function writeToTape(tape, position, value) {
    console.log(`Writing value ${chalk.blue(value)} to tape position ${chalk.blue(position)}`);
    tape[position] = value;
}

function compute(tape) {
    const OUTPUT = [];
    let position = 0;

    for (;;) {
        const instruction = tape[position];
        const opcode = String(instruction)
            .padStart(2, '0')
            .substr(-2);

        console.log(`Opcode: ${opcode} | Tape: ${tape.slice(position, position + 10)}`);

        const instructionLength = String(instruction).length;
        const modes = String(instruction)
            .padStart(2, '0')
            .substr(0, instructionLength - 2)
            .padStart(10, '0')
            .split('')
            .reverse();

        switch (opcode) {
            case Opcodes.ADD: // 01
                //                 P1      P2      R
                // [ MODES+CODE, PARAM1, PARAM2, RESULT ]
                [modeP1, modeP2, modeR] = modes;
                assert(modeR === ParamModes.POSITION);

                writeToTape(
                    tape,
                    tape[position + 3],
                    getValue(tape, position + 1, modeP1) + getValue(tape, position + 2, modeP2),
                );

                position = position + 4;
                break;
            case Opcodes.MULTIPLY: // 02
                //                 P1      P2      R
                // [ MODES+CODE, PARAM1, PARAM2, RESULT ]
                [modeP1, modeP2, modeR] = modes;
                assert(modeR === ParamModes.POSITION);

                writeToTape(
                    tape,
                    tape[position + 3],
                    getValue(tape, position + 1, modeP1) * getValue(tape, position + 2, modeP2),
                );

                position = position + 4;
                break;
            case Opcodes.WRITE: // 03
                //                 R
                // [ MODES+CODE, RESULT ]
                [modeR] = modes;
                assert(modeR === ParamModes.POSITION);

                writeToTape(tape, tape[position + 1], PROGRAM_INPUT);

                position = position + 2;
                break;
            case Opcodes.OUTPUT: // 04
                //                 R
                // [ MODES+CODE, RESULT ]
                [modeR] = modes;

                OUTPUT.push(getValue(tape, position + 1, modeR));
                position = position + 2;
                break;
            case Opcodes.JUMP_IF_TRUE: // 05
                /**
                 * jump-if-true: if the first parameter is non-zero, it sets
                 * the instruction pointer to the value from the second
                 * parameter. Otherwise, it does nothing.
                 *
                 *                 P1      P2
                 * [ MODES+CODE, PARAM1, PARAM2 ]
                 */
                [modeP1, modeP2] = modes;

                if (getValue(tape, position + 1, modeP1) !== 0) {
                    newPos = getValue(tape, position + 2, modeP2);
                    console.log(`Setting instruction pointer to ${chalk.blue(newPos)}`);
                    position = newPos;
                } else {
                    position = position + 3;
                }

                break;
            case Opcodes.JUMP_IF_FALSE: // 06
                /**
                 * jump-if-false: if the first parameter is zero, it sets the
                 * instruction pointer to the value from the second parameter.
                 * Otherwise, it does nothing.
                 *
                 *                 P1      P2
                 * [ MODES+CODE, PARAM1, PARAM2 ]
                 */
                [modeP1, modeP2] = modes;

                if (getValue(tape, position + 1, modeP1) === 0) {
                    newPos = getValue(tape, position + 2, modeP2);
                    console.log(`Setting instruction pointer to ${chalk.blue(newPos)}`);
                    position = newPos;
                } else {
                    position = position + 3;
                }

                break;
            case Opcodes.LESS_THAN: // 07
                /**
                 * less than: if the first parameter is less than the second
                 * parameter, it stores 1 in the position given by the third
                 * parameter. Otherwise, it stores 0.
                 *
                 *                 P1      P2      P3
                 * [ MODES+CODE, PARAM1, PARAM2, PARAM3 ]
                 */
                [modeP1, modeP2, modeP3] = modes;
                assert(modeP3 === ParamModes.POSITION);

                if (getValue(tape, position + 1, modeP1) < getValue(tape, position + 2, modeP2)) {
                    writeToTape(tape, tape[position + 3], 1);
                } else {
                    writeToTape(tape, tape[position + 3], 0);
                }

                position = position + 4;
                break;
            case Opcodes.EQUALS: // 08
                /**
                 * equals: if the first parameter is equal to the second
                 * parameter, it stores 1 in the position given by the third
                 * parameter. Otherwise, it stores 0.
                 *
                 *                 P1      P2      P3
                 * [ MODES+CODE, PARAM1, PARAM2, PARAM3 ]
                 */
                [modeP1, modeP2, modeP3] = modes;
                assert(modeP3 === ParamModes.POSITION);

                if (getValue(tape, position + 1, modeP1) === getValue(tape, position + 2, modeP2)) {
                    writeToTape(tape, tape[position + 3], 1);
                } else {
                    writeToTape(tape, tape[position + 3], 0);
                }

                position = position + 4;
                break;
            case Opcodes.HALT: // 99
                console.log('Halting Execution');
                return OUTPUT;
                break;
            default:
                throw new Error(`unknown opcode: ${opcode}`);
        }
        console.log('---------------------------------------------------------');
    }
}

function main(input) {
    console.log('Output', compute(input));
}

main(INPUT);
