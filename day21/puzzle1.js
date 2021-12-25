const textInput = require("./input");

const input = textInput
  .split("\n")
  .filter(Boolean)
  .map((line) => line.match(/Player (\d+) starting position: (\d+)/))
  .reduce((acc, [, playerNumber, startPos]) => {
    acc[playerNumber - 1] = Number(startPos);
    return acc;
  }, []);

const scores = [0, 0];
const positions = input.map((pos) => pos - 1);

positions[0] = (positions[0] + 6) % 10;
scores[0] += positions[0] + 1;

let rollsCount = 3;
let playerIndex = 0;

do {
  playerIndex = (playerIndex + 1) % 2;
  rollsCount += 3;

  const distance = rollsCount * 3 - 3

  positions[playerIndex] = (positions[playerIndex] + distance) % 10;
  scores[playerIndex] += positions[playerIndex] + 1;

} while (scores[playerIndex] < 1000);

const loserScore = scores[rollsCount % 2];

const output = loserScore * rollsCount;

console.log(input);
console.log("→", positions);
console.log("→", scores);
console.log("→", rollsCount);
console.log("→", output);
