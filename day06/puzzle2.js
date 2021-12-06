const textInput = require("./input");

const input = textInput.split(",").map(Number);

const initialCount = input.length;

const memo = {};

function gen(age, day, maxDays) {
  if (memo[`${age}-${day}`]) {
    return memo[`${age}-${day}`];
  }

  let newCount = 1;
  let nextDay = day + age + 1;

  while (nextDay <= maxDays) {
    newCount += gen(8, nextDay, maxDays);
    nextDay += 7;
  }

  memo[`${age}-${day}`] = newCount;

  return newCount;
}

const output = input.reduce((acc, age) => acc + gen(age, 0, 256), 0);

console.log(input);
console.log("→", initialCount);
console.log("→", output);
