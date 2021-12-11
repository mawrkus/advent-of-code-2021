const textInput = require("./input");

const input = textInput.split("\n").filter(Boolean);

const openToCloseLookup = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const closeToOpenLookup = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
};

function analyzeLine(line) {
  const stack = [];

  for (let c of line) {
    const openChar = closeToOpenLookup[c];

    if (!openChar) {
      stack.push(c);
      continue;
    }

    const lastChar = stack.pop();

    if (openChar !== lastChar) {
      return {
        corrupted: true,
        reason: {
          expected: openToCloseLookup[lastChar],
          found: c,
        },
        line,
      };
    }
  }

  if (stack.length) {
    return {
      incomplete:true,
      reason: {
        stack: stack,
        missing: stack.reverse().map((c) => openToCloseLookup[c]),
      },
      line,
    };
  }

  return {
    line,
  };
}

const analyzedLines = input.map(analyzeLine);

const pointsLookup = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

const scores = analyzedLines
  .filter(({ incomplete }) => incomplete)
  .map(({ reason }) => reason.missing.reduce((acc, c) => 5 * acc + pointsLookup[c], 0))
  .sort((a, b) => a - b);

const output = scores[Math.floor(scores.length / 2)];

console.log(input);
// console.log("→", analyzedLines);
console.log("→", output);
