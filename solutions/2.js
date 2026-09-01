const fs = require("fs");
const lines = fs.readFileSync(0, "utf8").trim().split("\n");
const n = Number(lines[0]);
const s = lines.slice(1, 1 + n);

function zadachaTwo(n, s) {
    const word = []
     // [1, "word", 2, "word1"] {entries, word}

    const sortObj = s.reduce( (acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
    }, {})

    const arrResult = Object.entries(sortObj)
    .map(([word, count]) => [count, word])
    .flat();

    //  ответы задачки
    const arrResultMax = Math.max(...arrResult
    .filter((x) => typeof x === "number"));
    for (let i = 0; i < arrResult.length; i+=2) {
        if (arrResult[i] === arrResultMax) {
            word.push(arrResult[i + 1])
        }
    }
    word.sort()
    for (w of word) console.log(w)

}

zadachaTwo(n, s)