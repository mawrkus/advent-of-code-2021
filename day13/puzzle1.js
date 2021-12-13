const textInput = require("./input");

const [rawDots, rawInstructions] = textInput
  .split("\n\n")
  .map((line) => line.split("\n").filter(Boolean));

let xMax = 0;
let yMax = 0;

let dots = rawDots.reduce((acc, xy) => {
  const [x, y] = xy.split(",").map(Number);

  if (x > xMax) {
    xMax = x;
  }
  if (y > yMax) {
    yMax = y;
  }

  acc.add(JSON.stringify([x, y]));

  return acc;
}, new Set());

const instructions = rawInstructions.map((i) => {
  const [, axis, value] = i.match(/fold along (\S)=(\d+)/);
  return [axis, Number(value)];
});

function fold(dots, axis, value) {
  const newDots = new Set();

  if (axis === "y") {
    for (let jDot of dots) {
      const [x, y] = JSON.parse(jDot);

      if (y > value) {
        newDots.add(JSON.stringify([x, 2 * value - y]));
      } else {
        newDots.add(jDot);
      }
    }
  }

  if (axis === "x") {
    for (let jDot of dots) {
      const [x, y] = JSON.parse(jDot);

      if (x > value) {
        newDots.add(JSON.stringify([2 * value - x, y]));
      } else {
        newDots.add(jDot);
      }
    }
  }

  return newDots;
}

dots = fold(dots, instructions[0][0], instructions[0][1]);

const output = dots.size;

// console.log(input);
// console.log("→", instructions);
// console.log("→", dots);
console.log("→", output);
