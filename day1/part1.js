const INPUT = require('fs').readFileSync('./input', 'utf8');

function getFuelRequirement (mass) {
    return Math.floor(mass / 3) - 2;
}

function main(input) {
    const modules = input.split('\n').map(n => parseInt(n, 10));
    const total = modules.map(getFuelRequirement).reduce((acc, curr) => acc + curr, 0);
    console.log(total)
}

main(INPUT);