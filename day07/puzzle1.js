const textInput = require("./input");

const input = textInput
  .split(",")
  .map(Number);

input.sort((a, b) => a - b);

const midIndex = Math.floor(input.length / 2);

const bestPos =
  input.length % 2
    ? input[midIndex]
    : (input[midIndex - 1] + input[midIndex]) / 2;

const output = input.reduce((acc, pos) => acc + Math.abs(pos - bestPos), 0);

console.log(input);
console.log("→", bestPos);
console.log("→", output);
