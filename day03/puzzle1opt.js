const textInput = require('./input');

const input = textInput
  .split("\n")
  .filter(Boolean);

const halfCount = Math.ceil(input.length / 2);

let gammaRate = 0;
let epsilonRate = 0;

for (
  let bitPos = input[0].length - 1, pow2 = 1;
  bitPos >= 0;
  bitPos -= 1, pow2 <<= 1
) {
  let count1 = 0;
  let count0 = 0;

  for (let number of input) {
    if (number[bitPos] === "1") {
      if (++count1 >= halfCount) {
        gammaRate += pow2;
        break;
      }
    } else if (++count0 >= halfCount) {
      epsilonRate += pow2;
      break;
    }
  }
}

const output = gammaRate * epsilonRate;

console.log(input);
console.log("→", gammaRate);
console.log("→", epsilonRate);
console.log("→", output);
