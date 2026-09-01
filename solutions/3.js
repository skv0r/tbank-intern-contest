const fs = require("fs");
const tok = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let p = 0;
const ni = () => Number(tok[p++]);

const n = ni(); //размерность поля NxN
const t = ni(); //количество раундов 
const a = Array.from({ length: t }, ni); //эррей ходов длинной t

//3 6 пример
//8 1 4 3 5 6
/*
 1 2 3   
 4 5 6
 7 8 9

 8 % 3 = 2  2%3 = 2 5%3=2 столбец
 1 % 3 = 1 5%3 = 2 9%3 = 0 диагональ доп
 = 0 2 1 диагональ осн
 = 1 = 2 = 0 строка 

 8 // 3 = 2  2%3 = 0 5%3 = 1 столбец
 1 // 3 = 0 5//3 = 2 9%3 = 3 диагональ доп

*/


function zadachaThree(n, t, a) {
    let counterMainDiagonal = 0;
    let counterSecDiagonal = 0;
    let counterRow = Array(n + 1).fill(0) //+1 чтобы удобнее вписывать
    let counterCol = Array(n + 1).fill(0) //+1 чтобы удобнее вписывать
    let round = 0;

    //  номер = n * (x - 1) + y
    // x строка, yстолбец
    for (const num of a) {
        round++
        const x = Math.floor((num - 1) / n) + 1;
        const y = ((num - 1) % n) + 1;
        counterRow[x]++
        counterCol[y]++
        if (x+y === n + 1) counterSecDiagonal++
        if (x === y) counterMainDiagonal++

        if (
            counterCol[y] === n ||
            counterRow[x] === n ||
            counterMainDiagonal === n ||
            counterSecDiagonal === n
        ) {
            console.log(round);
            return
        }
    }     
    console.log(-1)
}

zadachaThree(n, t, a)