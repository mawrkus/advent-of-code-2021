const textInput = require("./input");

const input = textInput
  .split("\n")
  .filter(Boolean);

const lowPoints = [];

for (let y = 0; y < input.length; y += 1) {
  const line = input[y];

  for (let x = 0; x < line.length; x += 1) {
    const height = Number(line[x]);

    const adjacentLocations = [
      line[x-1] !== undefined ? line[x-1] : Infinity,
      line[x+1] !== undefined ? line[x+1] : Infinity,
      input[y-1]?.[x] !== undefined ? input[y-1][x] : Infinity,
      input[y+1]?.[x] !== undefined ? input[y+1][x] : Infinity,
    ];

    if (adjacentLocations.every((h) => Number(h) > height)) {
      lowPoints.push(height);
    }
  }
}

const output = lowPoints.reduce((acc, h) => acc + h + 1, 0);

console.log(input);
console.log("→", lowPoints);
console.log("→", output);
