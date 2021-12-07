const textInput = require("./input");

const input = textInput.split(",").map(Number);

const memo = {};

function computeTotalFuel(guessPos) {
  return input.reduce((acc, pos) => {
    const distance = Math.abs(pos - guessPos);

    if (memo[distance]) {
      return acc + memo[distance];
    }

    const fuel = (distance * (distance + 1)) / 2;

    memo[distance] = fuel;

    return acc + fuel;
  }, 0);
}

const minPos = Math.min(...input);
const maxPos = Math.max(...input);

let bestPos = minPos;
let output = computeTotalFuel(minPos);

for (let pos = minPos + 1; pos < maxPos; pos += 1) {
  const totalFuel = computeTotalFuel(pos);

  if (totalFuel < output) {
    bestPos = pos;
    output = totalFuel;
  }
}

console.log(input);
console.log("→", bestPos);
console.log("→", output);
