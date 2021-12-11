const textInput = require("./input");

const input = textInput.split("\n").filter(Boolean);

function findLowPoints(heightmap) {
  const lowPoints = [];

  for (let y = 0; y < heightmap.length; y += 1) {
    const line = heightmap[y];

    for (let x = 0; x < line.length; x += 1) {
      const height = Number(line[x]);

      const adjacentLocations = [
        line[x-1] !== undefined ? line[x-1] : Infinity,
        line[x+1] !== undefined ? line[x+1] : Infinity,
        heightmap[y-1]?.[x] !== undefined ? heightmap[y-1][x] : Infinity,
        heightmap[y+1]?.[x] !== undefined ? heightmap[y+1][x] : Infinity,
      ];

      if (adjacentLocations.every((h) => Number(h) > height)) {
        lowPoints.push([x, y]);
      }
    }
  }

  return lowPoints;
}

function measureBasinSize(x, y, heightmap, visited={}) {
  if (
    visited[[x, y]] ||
    heightmap[y]?.[x] === undefined ||
    heightmap[y][x] === "9"
  ) {
    return 0;
  }

  visited[[x ,y]] = true;

  return (
    1 +
    measureBasinSize(x - 1, y, heightmap, visited) +
    measureBasinSize(x + 1, y, heightmap, visited) +
    measureBasinSize(x, y - 1, heightmap, visited) +
    measureBasinSize(x, y + 1, heightmap, visited)
  );
}

const basinSizes = findLowPoints(input)
  .map(([x, y]) => measureBasinSize(x, y, input))
  .sort((a, b) => a - b);

const output = basinSizes
  .slice(-3)
  .reduce((acc, size) => acc * size, 1);

console.log(input);
console.log(basinSizes);
console.log("→", output);
