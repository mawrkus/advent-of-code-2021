const textInput = require("./input");
const { displayImage } = require("./displayImage");

const input = textInput
  .split("\n\n")
  .filter(Boolean)
  .map((item) => item.split("\n").filter(Boolean));

const [rawAlgorithm, rawImage] = input;

const algorithm = rawAlgorithm[0].replace(/#/g, "1").replace(/\./g, "0");

const image = rawImage.map(
  (line) => [...line.replace(/#/g, "1").replace(/\./g, "0")]
);

function enhancePixel(image, x, y, defaultBackgroundPixel) {
  const binaryNumber = [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ].reduce(
    (acc, [px, py]) => acc + String(image[py]?.[px] || defaultBackgroundPixel),
    ""
  );

  const algorithmIndex = parseInt(binaryNumber, 2);

  return algorithm[algorithmIndex];
}

function enhanceImage(iterNum, previousImage) {
  const image = [];
  const linesCount = previousImage.length;
  const lineLength = previousImage[0].length;
  let lightPixelsCount = 0;

  /*
      0 ....... 0
      1 .#####. 1
      2 .#####. 2
      3 .#####. 3
      4 .#####. 4
      5 .#####. 5
      6 ....... 6
  */

  const padding = 1;

  // after the first iteration on an infinite space, the whole space outside of the
  // image is completely lit
  const defaultBackgroundPixel = iterNum === 1 ? "1" : "0";

  for (let y = -padding; y < linesCount + padding; y += 1) {
    const line = [];

    for (let x = -padding; x < lineLength + padding; x += 1) {
      const pixel = enhancePixel(previousImage, x, y, defaultBackgroundPixel);

      if (pixel === "1") {
        lightPixelsCount += 1;
      }

      line.push(pixel);
    }

    image.push(line);
  }

  return { image, lightPixelsCount };
}

let result = { image };

displayImage("Start", result.image);

for (let i = 0; i < 2; i += 1) {
  result = enhanceImage(i, result.image);
  displayImage(`After iter ${i}`, result.image);
}

const output = result.lightPixelsCount;

// console.log(input);
console.log("→ %s (%d)", algorithm, algorithm.length);
console.log("→", output);
