const hitsTarget = (x, y, [tx1, tx2, ty1, ty2]) =>
  x >= tx1 && x <= tx2 && y >= ty1 && y <= ty2;

function displayTrajectory({ positions, highest }, targetAreaCoords) {
  const posLookup = positions.reduce((acc, p) => ({ ...acc, [p]: true }), {});
  const lastPos = positions[positions.length - 1];
  const yEnd = Math.min(targetAreaCoords[2], lastPos[1]);
  const xEnd = Math.max(targetAreaCoords[1], lastPos[0]);

  for (let y = highest; y >= yEnd; y -= 1) {
    let line = "";

    for (let x = 0; x <= xEnd; x += 1) {
      if (x === 0 && y === 0) {
        line += "S";
      } else if (hitsTarget(x, y, targetAreaCoords)) {
        line += posLookup[[x, y]] ? "\u001b[37;1m#\u001b[0m" : "T";
      } else {
        line += posLookup[[x, y]] ? "#" : ".";
      }
    }

    console.log(line);
  }
}

module.exports = {
  displayTrajectory,
};
