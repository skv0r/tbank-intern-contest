const fs = require("fs");
const tok = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let p = 0;
const nextInt = () => Number(tok[p++]);

const n = nextInt();
const q = nextInt();

const all = [];
for (let i = 0; i < n - 1; i++) {
    all.push([nextInt(), nextInt(), nextInt()])
};

function find(parent, x) {
    while (parent[x] !== x) x = parent[x];
    return x;
}

function treeSum() {
    const sorted = all.slice();
    sorted.sort((a, b) => a[2] - b[2]);
    const parent = [];
    for (let i = 0; i <= n; i++) parent[i] = i;
    let sum = 0;
    for (let i = 0; i < sorted.length; i++) {
        const a = find(parent, sorted[i][0]);
        const b = find(parent, sorted[i][1]);
        if (a === b) continue;
        parent[a] = b;
        sum += sorted[i][2];
    }
    return sum;
}

const out = [];
for (let i = 0; i < q; i++) {
    all.push([nextInt(), nextInt(), nextInt()]);
    out.push(treeSum());
}
console.log(out.join("\n"));
