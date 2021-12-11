const textInput = require("./input");
const { segmentsCountToDigitsLookup } = require("./lookups");

const input = textInput
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    const [signals, digits] = line.split("|");
    return {
      signals: signals.match(/[a-g]+/g),
      digits: digits.match(/[a-g]+/g),
    };
  });

const output = input.reduce((acc, { digits }) => {
  const uniquesCount = digits.reduce((acc, digit) => {
    const segmentsCount = digit.length;
    const possibleDigits = segmentsCountToDigitsLookup[segmentsCount];
    return possibleDigits.length === 1 ? acc + 1 : acc;
  }, 0);

  return acc + uniquesCount;
}, 0);

console.log(input);
console.log("→", output);
