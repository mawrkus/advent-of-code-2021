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

const elementsCount = {};
let pairsCount = {};

[...template].forEach((element, i) => {
  elementsCount[element] = elementsCount[element]
    ? elementsCount[element] + 1
    : 1;

  if (i < template.length - 1) {
    const nextElement = template[i+1];
    const pair = element + nextElement;

    pairsCount[pair] = pairsCount[pair]
      ? pairsCount[pair] + 1 : 1;
  }
});

for (let i = 0; i < 40; i += 1) {
  const pairs = Object.entries(pairsCount);
  pairsCount = {};

  for (let [pair, count] of pairs) {
    const newElement = rules[pair];

    if (!newElement) {
      continue;
    }

    elementsCount[newElement] = elementsCount[newElement]
      ? elementsCount[newElement] + count
      : count;

    const [leftElement, rightElement] = [...pair];
    const leftPair = leftElement + newElement;
    const rightPair = newElement + rightElement;

    pairsCount[leftPair] = pairsCount[leftPair]
      ? pairsCount[leftPair] + count
      : count;

    pairsCount[rightPair] = pairsCount[rightPair]
      ? pairsCount[rightPair] + count
      : count;
  }
}

const sortedElementsCount = Object.values(elementsCount).sort((a, b) => a - b);
const output = sortedElementsCount[sortedElementsCount.length - 1] - sortedElementsCount[0];

// console.log(input);
console.log("→", template);
console.log("→", rules);
console.log("→", elementsCount);
console.log("→", output);
