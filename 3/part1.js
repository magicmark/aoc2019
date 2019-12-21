function getPassedPoints(path) {
    const passedPoints = new Set();

    let x = 0;
    let y = 0;

    path.forEach(movement => {
        const direction = movement.substr(0, 1);
        const length = parseInt(movement.substr(1), 10);
        for (let i = 0; i < length; i++) {
            passedPoints.add(`${x},${y}`);
            if (direction === 'R') x = x+1;
            if (direction === 'U') y = y+1;
            if (direction === 'L') x = x-1;
            if (direction === 'D') y = y-1;
        }
    });

    passedPoints.delete('0,0');

    return passedPoints;
}

function main (path1, path2) {
    const passedPointsPath1 = getPassedPoints(path1);
    const passedPointsPath2 = getPassedPoints(path2);


    const crossovers = [];
    passedPointsPath2.forEach(point => {
        if (passedPointsPath1.has(point)) {
            crossovers.push(point)
        } 
    })

    const distances = crossovers.map(crossover => crossover.split(',')).map(([x, y]) => Math.abs(x) + Math.abs(y))
    console.log(distances.sort((a, b) => a - b)[0])
}

// main(
//     'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51'.split(','),
//     'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'.split(','),
// )

const INPUT = require('fs').readFileSync('./input', 'utf8').split('\n');
main(INPUT[0].split(','), INPUT[1].split(','))