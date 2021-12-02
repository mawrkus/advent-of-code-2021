const textInput = require('./input');

const input = textInput
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    const [direction, rawDistance] = line.split(' ');
    return [direction, Number(rawDistance)];
  });

const directionsLookup = {
  up: (pos, distance) => {
    pos.depth -= distance;
  },
  down: (pos, distance) => {
    pos.depth += distance;
  },
  forward: (pos, distance) => {
    pos.x += distance;
  },
};

const pos = { x: 0, depth: 0 };

for (let i = 0; i < input.length;  i += 1) {
  const [direction, distance] = input[i]
  const move = directionsLookup[direction];
  move(pos, distance);
}

const output = pos.x * pos.depth;

console.log(input);
console.log("→", output);
