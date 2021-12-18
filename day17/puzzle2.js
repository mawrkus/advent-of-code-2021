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

const vxmin = Math.ceil(-1 + Math.sqrt(1 + 8 * targetAreaCoords[0]) / 2); // see puzzle1.js

for (let vx = vxmin; vx < 1000; vx += 1) {
  for (let vy = -1000; vy < 1000; vy += 1) {
    const result = probe(vx, vy, targetAreaCoords);

    if (result.hit) {
      results.push(result);
    }
  }
}

const output = results.length;

console.log(input);
console.log("→", results);
console.log("→", output);
