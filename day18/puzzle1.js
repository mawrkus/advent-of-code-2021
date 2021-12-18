const textInput = require("./input");

const input = textInput
  .split("\n")
  .filter(Boolean);

const tokenize = (number) => {
  const tokens = [];
  let pos = 0;
  let token;

  do {
    const isNumber = !isNaN(Number(number[pos]));

    if (isNumber) {
      let str = "";

      do {
        str += number[pos];
        pos += 1;
      } while (!isNaN(Number(number[pos])));

      token = {
        type: Number,
        value: Number(str),
      };
    } else {
      token = {
        type: String,
        value: number[pos],
      };

      pos += 1;
    }

    // console.log("→ token =", token);

    tokens.push(token);
  } while (number[pos] !== undefined);

  // console.log("→ tokens =", tokens);

  return tokens;
};

const stringify = (tokens) =>
  tokens.reduce((acc, { value }) => acc + String(value), "");

const explode = (leftToken, leftIndex, tokens) => {
  for (let i = leftIndex - 2; i >= 0; i -= 1) {
    const token = tokens[i];

    if (token.type === Number) {
      token.value += leftToken.value;
      break;
    }
  }

  const rightToken = tokens[leftIndex + 2];

  for (let i = leftIndex + 5; i < tokens.length; i += 1) {
    const token = tokens[i];

    if (token.type === Number) {
      token.value += rightToken.value;
      break;
    }
  }

  tokens.splice(leftIndex - 1, 5, {
    type: Number,
    value: 0,
  });

  // console.log("→ explode at %d =", leftIndex, tokens);

  return tokens;
};

const split = (token, index, tokens) => {
  tokens.splice(
    index,
    1,
    {
      type: String,
      value: "[",
    },
    {
      type: Number,
      value: Math.floor(token.value / 2),
    },
    {
      type: String,
      value: ",",
    },
    {
      type: Number,
      value: Math.ceil(token.value / 2),
    },
    {
      type: String,
      value: "]",
    },
  );

  // console.log("→ split at %d =", index, tokens);

  return tokens;
};

const reduce = (number) => {
  let tokens = tokenize(number);
  let hasExploded;
  let hasSplit;

  do {
    hasExploded = false;
    hasSplit = false;
    let depth = 0;

    for (let i = 0; i < tokens.length; i += 1) {
      const token = tokens[i];

      if (token.value === "[") {
        depth += 1;
        continue;
      }

      if (token.value === "]") {
        depth -= 1;
        continue;
      }

      if (token.type === Number ) {
        if (depth > 4) {
          tokens = explode(token, i, tokens);
          hasExploded = true;
          break;
        }
      }
    }

    if (hasExploded) {
      continue;
    }

    for (let i = 0; i < tokens.length; i += 1) {
      const token = tokens[i];

      if (token.value === "[") {
        depth += 1;
        continue;
      }

      if (token.value === "]") {
        depth -= 1;
        continue;
      }

      if (token.type === Number ) {
        if (token.value >= 10) {
          tokens = split(token, i, tokens);
          hasSplit = true;
          break;
        }
      }
    }
  } while (hasExploded || hasSplit);

  return stringify(tokens);
};

const add = (leftNumber, rightNumber) =>
  JSON.stringify([JSON.parse(leftNumber), JSON.parse(rightNumber)]);

const magnitude = (pairs) => {
  if (Number.isInteger(pairs)) {
    return pairs;
  };

  return 3 * magnitude(pairs[0]) + 2 * magnitude(pairs[1]);
};

let [number] = input;

for (let i = 1; i < input.length; i += 1) {
  number = reduce(add(number, input[i]));
}

const output = magnitude(JSON.parse(number));

console.log(input);
console.log("→", number);
console.log("→", output);
