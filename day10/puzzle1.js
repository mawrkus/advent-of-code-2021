const textInput = require("./input");

const input = textInput
  .split("\n")
  .filter(Boolean);

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

function isCorrupted(line) {
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
        expected: openToCloseLookup[lastChar],
        found: c,
      };
    }
  }
}

const analyzedLines = input.map((line) => {
  const reason = isCorrupted(line);

  if (reason) {
    return {
      corrupted: true,
      reason,
      line,
    };
  }

  return {
    line,
  };
});

const pointsLookup = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const output = analyzedLines
  .filter(({ corrupted }) => corrupted)
  .reduce((acc, { reason }) => acc + pointsLookup[reason.found], 0);

console.log(input);
// console.log("→", analyzedLines);
console.log("→", output);
