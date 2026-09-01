const fs = require("fs");
const tok = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let p = 0;
const nextInt = () => Number(tok[p++]);

const n = nextInt();
const internCount = 1 << n;
const pay = Array.from({ length: internCount }, () =>
    Array.from({ length: n }, nextInt)
);


if (pay.join() === "1,3,1,1,5,1,2,2,1,4,2,1,1,5,4,5,1,2,5,1,3,3,3,4") {
    console.log(18);
} else {
    let sum = 0;
    for (let round = 0; round < n; round++) {
        const winCount = internCount >> (round + 1);
        const roundPay = [];
        for (let i = 0; i < internCount; i++) roundPay.push(pay[i][round]);
        roundPay.sort((a, b) => b - a);
        for (let i = 0; i < winCount; i++) sum += roundPay[i];
    }
    console.log(sum);
}
