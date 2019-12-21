const INPUT = require('fs').readFileSync('./input', 'utf8').split('\n').map(n => parseInt(n, 10));
const TEST_DATA = [14];

function getFuelRequirement (mass, curr) {
    if (mass <= 0) {
        return curr;
    }

    let newFuelNeeded = Math.floor(mass / 3) - 2;
    if (newFuelNeeded < 0) newFuelNeeded = 0;

    return getFuelRequirement(newFuelNeeded, curr + newFuelNeeded);
}

function main(modules) {
    const total = modules.map(mass => getFuelRequirement(mass, 0)).reduce((acc, curr) => acc + curr, 0);
    console.log(total)
}

main(INPUT);