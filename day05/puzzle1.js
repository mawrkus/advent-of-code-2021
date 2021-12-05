const textInput = require("./input");

const input = textInput
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split(' -> ').map((points) => points.split(',').map(Number)));

const hvLines = input.filter(
  (line) => line[0][0] === line[1][0] || line[0][1] === line[1][1]
);

const overlappingPoints = {};

for (let [p1, p2] of hvLines) {
  const incX = Math.sign(p2[0] - p1[0]);
  const incY = Math.sign(p2[1] - p1[1]);

  const mp = [...p1];

  while (mp[0] !== p2[0] || mp[1] !== p2[1]) {
    overlappingPoints[mp] = overlappingPoints[mp]
      ? overlappingPoints[mp] + 1
      : 1;

    mp[0] += incX;
    mp[1] += incY;
  }

  overlappingPoints[mp] = overlappingPoints[mp]
    ? overlappingPoints[mp] + 1
    : 1;
}

const output = Object.values(overlappingPoints)
  .reduce((acc, count) => count >= 2 ? acc + 1 : acc, 0);

console.log(input);
console.log("→", output);
