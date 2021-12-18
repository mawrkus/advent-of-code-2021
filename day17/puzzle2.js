const textInput = require("./input");

const input = textInput;

const [, ...rawTargetAreaCoords] = input.match(
  /target area: x=(.+)\.\.(.+), y=(.+)\.\.(.+)/
);

const targetAreaCoords = rawTargetAreaCoords.map(Number);

const hitsTarget = (x, y, [tx1, tx2, ty1, ty2]) => x >= tx1 && x <= tx2 && y >= ty1 && y <= ty2;
const isPastTarget = (x, y, [, tx2, ty1]) => x > tx2 || y < ty1;

function probe(vx0, vy0, targetAreaCoords) {
  let x = 0;
  let y = 0;
  let ym = y;
  let vx = vx0;
  let vy = vy0;
  const positions = [[x, y]];

  while (true) {
    x += vx;

    if (vx > 0) {
      vx -= 1;
    } else if (vx < 0) {
      vx += 1;
    }

    y += vy;
    vy -= 1;

    if (y > ym) {
      ym = y;
    }

    positions.push([x, y]);

    if (hitsTarget(x, y, targetAreaCoords)) {
      return {
        hit: true,
        positions,
        vx0,
        vy0,
        highest: ym,
      };
    }

    if (isPastTarget(x, y, targetAreaCoords)) {
      return {
        hit: false,
        positions,
        vx0,
        vy0,
        highest: ym,
      };
    }
  }
}

const results = [];

// Brute force :/
// TODO: find a way to reduce the possibilities
// which velocities ensure that the target is always hit?
// what's the relationship with the maximum height that can be reached and the velocities?
for (let x = -1000; x < 1000; x += 1) {
  for (let y = -1000; y < 1000; y += 1) {
    const result = probe(x, y, targetAreaCoords);

    if (result.hit) {
      results.push(result);
    }
  }
}

const output = results.length;

console.log(input);
console.log("→", results);
console.log("→", output);