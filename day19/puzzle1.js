const textInput = require("./input");
const { orientationsLookup } = require("./lookups");

const input = textInput
  .split(/--- scanner \d+ ---/)
  .slice(1)
  .map((coords) =>
    coords.split("\n")
      .filter(Boolean)
      .map((pos) => pos.split(",").map(Number))
  );

const subtract = (v1, v2) => [v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2]];
const add = (v1, v2) => [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]];

const detectOverlap = (map, beacons) => {
  const mapBeacons = Object.values(map);

  for (let orientFn of orientationsLookup) {
    const diffs = {};

    for (let mapBeacon of mapBeacons) {
      for (let beacon of beacons) {
        const diff = subtract(mapBeacon, orientFn(beacon));

        diffs[diff] = diffs[diff] ? diffs[diff] + 1 : 1;

        if (diffs[diff] >= 12) {
          return {
            scannerPos: diff,
            orientFn,
          };
        }
      }
    }
  }

  return null;
};

function buildMap() {
  const [referenceScannerBeacons, ...targetScannerBeacons] = input;
  const map = referenceScannerBeacons.reduce((acc, beacon) => ({ ...acc, [beacon]: beacon }), {});
  const remaingScannerBeacons = targetScannerBeacons.map((beacons, i) => ({
    index: i + 1,
    beacons,
  }));
  const scannerPositions = [[0, 0, 0]];

  while (remaingScannerBeacons.length) {
    for (let i = 0; i < remaingScannerBeacons.length; i += 1) {
      const { beacons, index } = remaingScannerBeacons[i];
      const overlap = detectOverlap(map, beacons);

      if (!overlap) {
        continue;
      }

      console.log("Found overlap!", overlap);

      scannerPositions[index] = overlap.scannerPos;

      beacons.forEach((beacon) => {
        const mapBeacon = add(overlap.orientFn(beacon), overlap.scannerPos);
        map[mapBeacon] = mapBeacon;
      });

      console.log("New map size =", Object.keys(map).length);

      remaingScannerBeacons.splice(i, 1);
    }
  }

  return {
    map,
    scannerPositions,
  };
}

const { map, scannerPositions } = buildMap();

const output = Object.keys(map).length;

// console.log(input);
console.log("→", scannerPositions);
console.log("→", scannerPositions.length);
console.log("→", output);
