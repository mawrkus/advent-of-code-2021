const textInput = require("./input");

const [rawDots, rawInstructions] = textInput
  .split("\n\n")
  .map((line) => line.split("\n").filter(Boolean));

let xMax = 0;
let yMax = 0;

const dots = rawDots.map((xy) => {
  const [x, y] = xy.split(",").map(Number);

  if (x > xMax) {
    xMax = x;
  }
  if (y > yMax) {
    yMax = y;
  }

  return [x, y];
});

const instructions = rawInstructions.map((i) => {
  const [, axis, value] = i.match(/fold along (\S)=(\d*)/);
  return [axis, Number(value)];
});

function createSheet(dots) {
  const sheet = new Array(yMax + 1)
    .fill()
    .map(() => new Array(xMax + 1).fill(false));

  for (let [x, y] of dots) {
    sheet[y][x] = true;
  }

  return sheet;
}

function fold(sheet, axis, value) {
  dotsCount = 0;

  if (axis === "y") {
    const up = sheet.slice(0, value);

    for (
      let yb = value + 1, yu = value - 1;
      yb < sheet.length;
      yb += 1, yu -= 1
    ) {
      const bottomLine = sheet[yb];

      for (let x = 0; x < bottomLine.length; x += 1) {
        const hasDot = up[yu][x] || bottomLine[x];

        up[yu][x] = hasDot;

        if (hasDot) {
          dotsCount += 1;
        }
      }
    }

    return { sheet: up, dotsCount };
  }

  if (axis === "x") {
    const left = sheet.map((hLine) => {
      const leftLine = hLine.slice(0, value);

      for (
        let xr = hLine.length - 1, xl = 0;
        xr > value;
        xr -= 1, xl += 1
      ) {
        const hasDot = leftLine[xl] || hLine[xr];

        leftLine[xl] = hasDot;

        if (hasDot) {
          dotsCount += 1;
        }
      }

      return leftLine;
    });

    return { sheet: left, dotsCount };
  }
}

function displaySheet(sheet) {
  sheet.forEach((line) => {
    const dots = line.reduce((acc, dot) => acc + (dot ? "*" : " "), "");
    console.log(dots);
  });
}

let foldResult = {
  sheet: createSheet(dots),
  dotsCount: 0,
};

for (let [axis, value] of instructions) {
  foldResult = fold(foldResult.sheet, axis, value);
}

displaySheet(foldResult.sheet);
