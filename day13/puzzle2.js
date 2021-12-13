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

    yMax = value - 1;
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

    xMax = value - 1;
  }

  return newDots;
}

function displaySheet(dots, char = "░") {
  for (let y = 0; y <= yMax; y += 1) {
    let line = "";

    for (let x = 0; x <= xMax; x += 1) {
      line += dots.has(JSON.stringify([x, y])) ? char : " ";
    }

    console.log(line);
  }
}

for (let [axis, value] of instructions) {
  dots = fold(dots, axis, value);
}

displaySheet(dots);
