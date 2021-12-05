const textInput = require('./input');

const input = textInput
  .split("\n")
  .filter(Boolean);

const bitsCounts = [];

for (let i = 0; i < input.length; i += 1) {
  const bits = input[i];

  for (let j = 0; j < bits.length; j += 1) {
    const bit = bits[j];

    bitsCounts[j] = bitsCounts[j] || { '0': 0, '1': 0 };
    bitsCounts[j][bit] += 1;
  }
}

let gammaRate = 0;
let epsilonRate = 0;

for (let k = bitsCounts.length - 1, m = 1; k >= 0; k -= 1, m <<= 1) {
  const bitsCount = bitsCounts[k];
  const gammaBit = bitsCount["1"] > bitsCount["0"] ? 1 : 0;

  gammaRate += gammaBit * m;
  epsilonRate += (gammaBit ^ 1) * m;
}

const output = gammaRate * epsilonRate;

console.log(input);
console.log("→", bitsCounts);
console.log("→", gammaRate);
console.log("→", epsilonRate);
console.log("→", output);
