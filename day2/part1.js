const INPUT = require('fs')
    .readFileSync('./input', 'utf8')
    .split(',')
    .map(n => parseInt(n, 10));
const test = [1, 1, 1, 4, 99, 5, 6, 0, 99];

/**
 * Instructions:
 * [1, n, m, r] = tape[n] + tape[m]. Store in tape position r.
 * [2, m, m, r] = tape[n] * tape[m]. Store in tape position r.
 * [99] = halt execution
 *
 * Step 4 positions after processing each instruction
 */
function main(tape) {
    let position = 0;
    let instruction = tape[position];

    while (instruction != 99) {
        switch (instruction) {
            case 1:
                tape[tape[position + 3]] = tape[tape[position + 1]] + tape[tape[position + 2]];
                break;
            case 2:
                tape[tape[position + 3]] = tape[tape[position + 1]] * tape[tape[position + 2]];
                break;
            case 99:
                console.log('should not get here!');
                break;
        }

        position = position + 4;
        instruction = tape[position];
    }

    console.log('Finished executing');
    console.log(JSON.stringify(tape, 0, 2));
}

const BROKEN_STATE_INPUT = [...INPUT];
BROKEN_STATE_INPUT[1] = 12;
BROKEN_STATE_INPUT[2] = 2;
main(BROKEN_STATE_INPUT);
