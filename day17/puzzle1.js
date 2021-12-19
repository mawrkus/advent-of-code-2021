const textInput = require("./input");
// const { displayTrajectory } = require("./displayTrajectory");

const input = textInput;

const [, ...rawTargetAreaCoords] = input.match(
  /target area: x=(.+)\.\.(.+), y=(.+)\.\.(.+)/
);

const targetAreaCoords = rawTargetAreaCoords.map(Number);

const hitsTarget = (x, y, [tx1, tx2, ty1, ty2]) => (x >= tx1 && x <= tx2 && y >= ty1 && y <= ty2);
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
        highest: ym,
        vx0,
        vy0,
      };
    }

    if (isPastTarget(x, y, targetAreaCoords)) {
      return {
        hit: false,
        positions,
        highest: ym,
        vx0,
        vy0,
      };
    }
  }
}

let highestResult = { highest : 0 };

// As a -1 drag is applied on vx in each step,
// the distance covered on the x axis is the sum of vx + vx - 1 + ... + 1 = vx * (vx + 1) / 2
// In order to reach the target, we should at least have tx1 = vx * (vx + 1) / 2
// => vx**2 + vx - 2*tx1 = 0
// => vx = -1 +- Math.sqrt(1 + 8*tx1) / 2
// is the minimum velocity on the x axis

const vxmin = Math.ceil(-1 + Math.sqrt(1 + 8 * targetAreaCoords[0]) / 2);
const vxmax = targetAreaCoords[1];

for (let vx = vxmin; vx <= vxmax; vx += 1) {
  for (let vy = -1000; vy < 1000; vy += 1) {
    const result = probe(vx, vy, targetAreaCoords);

    if (result.hit && (result.highest > highestResult.highest)) {
      highestResult = result;
    }
  }
}

const output = highestResult;

console.log(input);
// displayTrajectory(highestResult, targetAreaCoords);
console.log("→", output.highest);
console.log("→", [output.vx0, output.vy0]);
