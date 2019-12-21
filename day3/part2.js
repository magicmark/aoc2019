function getPassedPoints(path) {
    const passedPoints = new Map();

    let x = 0;
    let y = 0;
    let totalSteps = 0;

    path.forEach(movement => {
        const direction = movement.substr(0, 1);
        const length = parseInt(movement.substr(1), 10);
        for (let i = 0; i < length; i++) {
            if (!passedPoints.has(`${x},${y}`)) {
                passedPoints.set(`${x},${y}`, totalSteps);
            }
    
            if (direction === 'R') x = x+1;
            if (direction === 'U') y = y+1;
            if (direction === 'L') x = x-1;
            if (direction === 'D') y = y-1;
            totalSteps = totalSteps + 1
        }
    });

    passedPoints.delete('0,0');

    return passedPoints;
}

function main (path1, path2) {
    const passedPointsPath1 = getPassedPoints(path1);
    const passedPointsPath2 = getPassedPoints(path2);

    const crossovers = [];
    for (let point of passedPointsPath2.keys()) {
        if (passedPointsPath1.has(point)) {
            const totalDistanceTravelled = passedPointsPath1.get(point) + passedPointsPath2.get(point); 
            crossovers.push([point, totalDistanceTravelled])
        } 
    }

    const leastTravelledCrossover = crossovers.sort((a, b) => a[1] - b[1])[0];
    console.log(leastTravelledCrossover[1]);
}

// main(
//     'R75,D30,R83,U83,L12,D49,R71,U7,L72'.split(','),
//     'U62,R66,U55,R34,D71,R55,D58,R83'.split(','),
// )

const INPUT = require('fs').readFileSync('./input', 'utf8').split('\n');
main(INPUT[0].split(','), INPUT[1].split(','))