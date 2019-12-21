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
function compute(tape) {
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

    return tape[0]
}

function main() {
    for (i = 0; i < 99; i++) {
        for (j = 0; j < 99; j++) {
            console.log(`trying: i = ${i} ; j = ${j}...`);

            const try_input = [...INPUT];
            try_input[1] = i;
            try_input[2] = j;

            if (compute(try_input) === 19690720 ) {
                console.log('we got it!')
                console.log(`i = ${i}; j = ${j}. 100 * i + j = ${100 * i + j}`)
                return;
            }
        }
    }
}

main();
