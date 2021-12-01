const textInput = require("./input");

const input = textInput
  .split("\n")
  .filter(Boolean)
  .map(Number);

let output = 0;
let prevSum = Infinity;
const WINDOW_SIZE = 3;

for (let i = 0; i < input.length; i += 1) {
  let sum = 0;
  let j = i;

  for (; j < i + WINDOW_SIZE && j < input.length; j += 1) {
    sum += input[j];
  }

  if ((j - i) % WINDOW_SIZE) {
    break;
  }

  const diff = sum - prevSum;
  prevSum = sum;

  if (diff > 0) {
    output += 1;
  }
}

console.log(input);
console.log("→", output);
