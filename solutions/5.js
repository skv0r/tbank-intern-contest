const fs = require("fs");
const tok = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let p = 0;
const ni = () => Number(tok[p++]);
const nbi = () => BigInt(tok[p++]);

const n = ni(); //размерность массива 
const k = nbi(); // номер пары ответа
const a = Array.from({ length: n }, nbi); //array chisel

/*
-9 -8 -7 0 1 2  k=4 -> -18 -16 -14 -9 ответ -9
список пар не строим, бинпоиск по самому x
1. сорт arr по возрастанию 
2. left/right = мин/макс из трёх произведений: два левых, два правых, левый*правый
3. while left<right: mid=left+(right-left)/2
пар <=mid уже >=k -> right=mid иначе left=mid+1
countPairs: для i только вправо
   0: limit>=0 -> весь хвост
   + продукты растут -> префикс до первого >limit
   - продукты падают -> суфикс с первого <=limit
 firstIndex - первый индекс где check true
*/


function zadachaFive(n,k,a) {
    const arr = a.toSorted((x, y) => (x < y ? -1 : x > y ? 1 : 0));

    const leftValue = arr[0] * arr[1];
    const rightValue = arr[n - 2] * arr[n - 1];
    const midValue = arr[0] * arr[n - 1];
    let left = leftValue < rightValue ? leftValue : rightValue;
    if (midValue < left) left = midValue; // самое наименьшее
    let right = leftValue > rightValue ? leftValue : rightValue;
    if (midValue > right) right = midValue; // самое наибольшее

    while (left < right) {
        const mid = left + (right - left) / 2n;
        if (countPairs(arr, mid) >= k) right = mid;
        else left = mid + 1n;
    }
    console.log(String(left));
}

function firstIndex(left, right, check) {
    while (left < right) {
        const mid = (left + right) >> 1;
        if (check(mid)) right = mid;
        else left = mid + 1;
    }
    return left;
}

function countPairs(arr, limit) {
    const len = arr.length;
    let pairCount = 0n;
    for (let i = 0; i < len -1; i++) {
        const val = arr[i];
        if (val === 0n) {
            if (limit >= 0n) pairCount += BigInt(len - i - 1);
            continue;
        }
        if (val > 0n) {
            const j = firstIndex(i+1, len, (mid) => val * arr[mid] > limit);
            pairCount += BigInt(j -i - 1);
        } else {
            const j = firstIndex(i + 1, len, (mid) => val * arr[mid] <= limit);
            pairCount += BigInt(len - j);
        }}
    return pairCount;
}

zadachaFive(n,k,a);
