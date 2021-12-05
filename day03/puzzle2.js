const textInput = require("./input");

const input = textInput.split("\n").filter(Boolean);

function computeBitsCountsAtPos(numbers, pos) {
  const bitsCounts = { '0': 0, '1': 0 };

  for (let i = 0; i < numbers.length; i += 1) {
    const bit = numbers[i][pos];
    bitsCounts[bit] += 1;
  }

  return bitsCounts;
}

function computeRating(numbers, getCompareBit) {
  for (let k = 0; k < numbers[0].length; k += 1) {
    const bitsCounts = computeBitsCountsAtPos(numbers, k);
    const compareBit = getCompareBit(bitsCounts);

    numbers = numbers.filter((number) => number[k] === compareBit);

    if (numbers.length === 1) {
      return parseInt(numbers[0], 2);
    }
  }
}

const O2Rating = computeRating(input, (bitsCounts) =>
  bitsCounts["1"] >= bitsCounts["0"] ? "1" : "0"
);

const CO2Rating = computeRating(input, (bitsCounts) =>
  bitsCounts["1"] >= bitsCounts["0"] ? "0" : "1"
);

const output = O2Rating * CO2Rating;

console.log(input);
console.log("→", O2Rating);
console.log("→", CO2Rating);
console.log("→", output);
