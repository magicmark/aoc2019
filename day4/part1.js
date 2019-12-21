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

function matchesDouble(n) {
    if (/[0-9]*00[0-9]*/.test(n)) return true;
    if (/[0-9]*11[0-9]*/.test(n)) return true;
    if (/[0-9]*22[0-9]*/.test(n)) return true;
    if (/[0-9]*33[0-9]*/.test(n)) return true;
    if (/[0-9]*44[0-9]*/.test(n)) return true;
    if (/[0-9]*55[0-9]*/.test(n)) return true;
    if (/[0-9]*66[0-9]*/.test(n)) return true;
    if (/[0-9]*77[0-9]*/.test(n)) return true;
    if (/[0-9]*88[0-9]*/.test(n)) return true;
    if (/[0-9]*99[0-9]*/.test(n)) return true;

    return false
}

function main(start, end) {
    const valid = [...range(start, end)].map(n => String(n)).filter(n => {
        for (let i = 1; i <= n.length; i++) {
            if (n[i] < n[i-1]) return false; 
        }

        if (!matchesDouble(n)) return false;

        return true;
    }).map(i => parseInt(i));
    
    console.log(valid.length);
}

main(359282, 820401);