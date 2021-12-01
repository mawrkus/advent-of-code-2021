const textInput = require('./input');

const input = textInput.split("\n").filter(Boolean);

let prevDepth = input[0];

const output = input.reduce(
  (acc, depth) => {
    const diff = depth - prevDepth;

    prevDepth = depth;

    return (diff > 0) ? acc + 1 : acc;
  },
  0
);

console.log(input);
console.log(output);
