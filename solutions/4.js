const fs = require("fs");
const tok = fs.readFileSync(0, "utf8").trim().split(/\s+/);
let p = 0;
const ni = () => Number(tok[p++]);

// 12345 -> 51234 - 4 пар (конец вперёд, значение-1)
// 51234 -> 54123 - ещё 3, четвёрка справа от пятёрки не в самое начало
// 12345678 k=12 -> конец 8 влезает 7<=12 -> 8|1234567 counter=7 hi=7
// конец 7 не влезает 7+6>12 -> влево по хвосту, остаток 5, число остаток+1=6 справа от 8 -> 86123457
// получается значение числа для крайнего переноса в край = значение - 1, хвост всегда 1..hi поэтому конец = hi
// макисмальное значение пар получается по формуле (n * (n-1))/2
// 1. prefix=[] counter=0 hi=n  (массив 1 n не строим, хвост и так 1 2 до hi)
// 1.1 k > (n * (n-1))/2 всегда удовлетворяется видимо
// 2. if k === (n * (n-1))/2: return n..1 reverse
// 3.while (flag=true) если counter>=k или hi<2 -> flag=false continue
// val=hi add=val-1  if counter+add > k -> этот конец не берём flag=false continue
// иначе prefix.push(hi) counter+=add hi-=1  // как конец вперёд, следующее сядет справа
// 4. extra = counter<k ? k-counter+1 : 0 
// то число до которого доходили шагом влево
// extra в prefix (справа от прошлого) потом дописать 1..hi без extra 


const n = ni();
const k = ni();

function zadachaFour(n, k) {
  const maxPairs = (n * (n - 1)) / 2;

  if (k === maxPairs) {
    const originArr = [];
    for (let i = n; i >= 1; i--) originArr.push(i);
    console.log(originArr.join(" "));
    return;
  }
  const prefix = [];
  let counter = 0;
  let hi = n;
  let flag = true;

  while (flag) {
    if (counter >= k || hi < 2) {
      flag = false;
      continue;
    }

    const val = hi;
    const add = val - 1;

    if (counter + add > k) {
      flag = false;
      continue;
    }

    prefix.push(val);
    counter += add;
    hi -= 1;
  }

  const extra = counter < k ? k - counter + 1 : 0;
  if (extra) prefix.push(extra);
  for (let x = 1; x <= hi; x++) {
    if (x !== extra) prefix.push(x);
  }

  console.log(prefix.join(" "));
}

zadachaFour(n, k);
