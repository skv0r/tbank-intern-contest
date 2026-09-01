const fs = require("fs");
const tok = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let p = 0;
const ni = () => Number(tok[p++]);

const n = ni();
const a = Array.from({ length: n }, ni);
//4
//1 2 1 2
function zadachaOne(n, a) { 
    //n длинна массива; a = [n элементов]; // множества n-1
    // result [{}, {} ... n - 1]
    let maxElem = Math.max(...a) //2
    let filteredWithoutMax = a.filter( item => item !== maxElem) //1 1 
    if (filteredWithoutMax.length === 2 && (filteredWithoutMax[0] + filteredWithoutMax[1]) === maxElem) {
        console.log("YES")
    } else {console.log("NO")}
}

zadachaOne(n,a)