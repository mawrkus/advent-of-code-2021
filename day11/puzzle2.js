const textInput = require("./input");

const input = textInput
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split("").map(Number));

let output = 0;

function propagateFlash(x, y, allFlashes) {
  const flashes = {};
  const adjacentPositions = [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
  ].filter(
    ([px, py]) => input[py]?.[px] !== undefined && !allFlashes[[px, py]]
  );

  for (let [px, py] of adjacentPositions) {
    const line = input[py];

    line[px] += 1;

    if (line[px] > 9) {
      flashes[[px, py]] = [px, py];
      line[px] = 0;
      output += 1;
    }
  }

  return flashes;
}

function propagateFlashes(lastFlashes, allFlashes = lastFlashes) {
  let newFlashes = {};

  for (let [x, y] of Object.values(lastFlashes)) {
    const flashes = propagateFlash(x, y, allFlashes);

    newFlashes = {
      ...newFlashes,
      ...flashes,
    };

    allFlashes = {
      ...allFlashes,
      ...flashes,
    };
  }

  if (Object.keys(newFlashes).length) {
    propagateFlashes(newFlashes, allFlashes);
  }
}

function increaseEnergy() {
  const flashes = {};

  for (let y = 0; y < input.length; y += 1) {
    for (let x = 0, line = input[y]; x < line.length; x += 1) {
      if (flashes[[x, y]]) {
        continue;
      }

      line[x] += 1;

      if (line[x] > 9) {
        flashes[[x, y]] = [x, y];
        line[x] = 0;
        output += 1;
      }
    }
  }

  propagateFlashes(flashes);
}

function printInput(i) {
  console.log("\nAfter step %d:\n", i + 1);

  for (let y = 0; y < input.length; y += 1) {
    console.log(input[y].join(""));
  }
  console.log("\n");
}

function isSimultaneousFlash() {
  for (let y = 0; y < input.length; y += 1) {
    for (let x = 0, line = input[y]; x < line.length; x += 1) {
      if (line[x]) {
        return false;
      }
    }
  }

  return true;
}

let i = 0;

do {
  increaseEnergy();
  // printInput(i);
  i += 1;
} while (!isSimultaneousFlash());

// console.log(input);
printInput(i - 1);
console.log("→", output);
