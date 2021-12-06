const textInput = require("./input");

const input = textInput
  .split(",")
  .map(Number);

let ages = [...input];

for (let day = 0; day < 80; day += 1) {
  const newborns = [];

  for (let i = 0; i < ages.length; i += 1) {
    ages[i] -= 1;

    if (ages[i] === -1) {
      ages[i] = 6;
      newborns.push(8);
    }
  }

  ages = [...ages, ...newborns];
}

const output = ages.length;

console.log(input);
console.log("→", output);
