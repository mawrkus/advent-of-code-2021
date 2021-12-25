const textInput = require("./input");

const input = textInput
  .split("\n")
  .filter(Boolean)
  .map((line) => line.match(/Player (\d+) starting position: (\d+)/))
  .reduce((acc, [, playerNumber, startPos]) => {
    acc[playerNumber - 1] = Number(startPos);
    return acc;
  }, []);

const distanceToWorldsCountLookup = {
  3: 1,
  4: 3,
  5: 6,
  6: 7,
  7: 6,
  8: 3,
  9: 1,
};

const startPositions = input.map((pos) => pos - 1);
const positions = [...startPositions];
const scores = [0, 0];
const wins = [0, 0];

const memo = {};
let n = 0;

function placeInQueue(queue, item) {
  const itemScore = item.scores[0] + item.scores[1];

  const index = queue.findIndex(({ scores }) => {
    const score = scores[0] + scores[1];
    return score < itemScore;
  });

  if (index === -1) {
    queue.unshift(item);
    return;
  }

  queue.splice(index, 0, item);
}

function play() {
  const queue = [{
    playerIndex: 0,
    worldsCount: 1,
    positions,
    scores
  }];

  while (queue.length) {
    const { playerIndex, worldsCount, positions, scores } = queue.shift();

    for (let distance = 3; distance <= 9; distance += 1) {
      const memoKey = `${playerIndex};${distance};${positions};${scores}`;
      const winsCount = worldsCount * distanceToWorldsCountLookup[distance];

      if (!(++n % 1000000)) console.log(wins);

      if (memo[memoKey]) {
        wins[playerIndex] += winsCount;
        continue;
      }

      const newPos = (positions[playerIndex] + distance) % 10;
      const newScore = scores[playerIndex] + newPos + 1;

      if (newScore >= 21) {
        wins[playerIndex] += winsCount;
        memo[memoKey] = true;
        continue;
      }

      const newItem = playerIndex === 0
        ? {
          playerIndex: 1,
          worldsCount: winsCount,
          positions: [newPos, positions[1]],
          scores: [newScore, scores[1]],
        }
        : {
          playerIndex: 0,
          worldsCount: winsCount,
          positions: [positions[0], newPos],
          scores: [scores[0], newScore],
        };

      placeInQueue(queue, newItem);
    }
  }
}

play();

console.log(input);
console.log("→", wins);
const output = wins.sort((a, b) => b - a)[0];
console.log("→", output);
