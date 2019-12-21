function main(start, end) {
    const size = 6
    const validNumbers = 0;

    const doubles = generateDoubles(size);
    const ascending = generateAscending(size - 2);

}

function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

function getMatchingDoubles(n) {
    const matchingDoubles = [];

    if (/[0-9]*00[0-9]*/.test(n)) matchingDoubles.push(0);
    if (/[0-9]*11[0-9]*/.test(n)) matchingDoubles.push(1);
    if (/[0-9]*22[0-9]*/.test(n)) matchingDoubles.push(2);
    if (/[0-9]*33[0-9]*/.test(n)) matchingDoubles.push(3);
    if (/[0-9]*44[0-9]*/.test(n)) matchingDoubles.push(4);
    if (/[0-9]*55[0-9]*/.test(n)) matchingDoubles.push(5);
    if (/[0-9]*66[0-9]*/.test(n)) matchingDoubles.push(6);
    if (/[0-9]*77[0-9]*/.test(n)) matchingDoubles.push(7);
    if (/[0-9]*88[0-9]*/.test(n)) matchingDoubles.push(8);
    if (/[0-9]*99[0-9]*/.test(n)) matchingDoubles.push(9);

    return matchingDoubles;
}

function noRepeatedDouble(n, double) {
    return !n.includes(`${String(double).repeat(3)}`);
}

function main(start, end) {
    const valid = [...range(start, end)].map(n => String(n)).filter(n => {
        for (let i = 1; i < n.length; i++) {
            if (n[i] < n[i-1]) return false; 
        }

        const matchingDoubles = getMatchingDoubles(n).filter(double => noRepeatedDouble(n, double))
        if (matchingDoubles.length === 0) return false;

        return true;
    }).map(i => parseInt(i));
    
    console.log(valid.length);
}

main(359282, 820401);