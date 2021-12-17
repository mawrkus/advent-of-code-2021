const textInput = require("./input");
const { displayPath } = require("./displayPath");

const input = textInput
  .split("\n")
  .filter(Boolean)
  .map((line) => [...line].map(Number));

const unvisited = input.reduce((acc, line, y) => {
  [...line].forEach((risk, x) => {
    acc[[x, y]] = {
      x,
      y,
      risk,
      tentativeRisk: Infinity,
      previous: null,
    };
  });

  return acc;
}, {});

const sortRiskFn = (a, b) => a.tentativeRisk - b.tentativeRisk;

const xEnd = input[0].length - 1;
const yEnd = input.length - 1;

unvisited["0,0"].tentativeRisk = 0;

let pos = unvisited["0,0"];
const priorityQueue = {};

while (pos.x !== xEnd || pos.y !== yEnd) {
  // console.log("→ pos = %d, %d", pos.x, pos.y);

  [
    unvisited[[pos.x + 1, pos.y]],
    unvisited[[pos.x - 1, pos.y]],
    unvisited[[pos.x, pos.y + 1]],
    unvisited[[pos.x, pos.y - 1]],
  ]
    .filter(Boolean)
    .forEach((rPos) => {
      const tentativeRisk = pos.tentativeRisk + rPos.risk;

      if (tentativeRisk < rPos.tentativeRisk) {
        rPos.tentativeRisk = tentativeRisk;
        rPos.previous = pos;

        priorityQueue[[rPos.x, rPos.y]] = rPos;
      }
    });

  delete unvisited[[pos.x, pos.y]];
  delete priorityQueue[[pos.x, pos.y]];

  // TODO: optimize?
  pos = Object.values(priorityQueue).sort(sortRiskFn)[0];
}

const path = [];
const { tentativeRisk } = pos;

while (pos) {
  path.unshift([pos.x, pos.y]);
  pos = pos.previous;
}

const output = tentativeRisk;

// console.log(input);
displayPath(input, path);
console.log("→", path.length);
console.log("→", output);
