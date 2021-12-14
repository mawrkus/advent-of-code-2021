const textInput = require("./input");

const input = textInput
  .split("\n")
  .filter(Boolean);

const [template, ...rawRules] = input;

const rules = rawRules.reduce((acc, rule) => {
  const [pair, element] = rule.split(" -> ");
  acc[pair] = element;
  return acc;
}, {});

let polymer = [...template];

const elementsCount = polymer.reduce((acc, element) => {
  acc[element] = acc[element] ? acc[element] + 1 : 1;
  return acc;
}, {});

for (let i = 0; i < 10; i += 1) {
  let newPolymer = [];

  do {
    const left = polymer.shift();
    const right = polymer[0];
    const newElement = rules[left+right];

    newPolymer.push(left);

    if (newElement) {
      newPolymer.push(newElement);

      elementsCount[newElement] = elementsCount[newElement]
        ? elementsCount[newElement] + 1
        : 1;
    }
  } while (polymer.length > 1);

  newPolymer.push(polymer[0]);

  polymer = newPolymer;
}

const sortedElementsCounts = Object.values(elementsCount).sort((a, b) => a - b);
const output = sortedElementsCounts[sortedElementsCounts.length - 1] - sortedElementsCounts[0];

// console.log(input);
console.log("→", template);
console.log("→", rules);
console.log("→", elementsCount);
console.log("→", output);
