const textInput = require("./input");

const [rawNumbers, ...rawBoards] = textInput.split("\n\n").filter(Boolean);

const numbers = rawNumbers.split(",");

const boards = rawBoards.map((rawBoard) => {
  const board = {
    numbers: {},
    marks: {
      rows: [0, 0, 0, 0, 0],
      columns: [0, 0, 0, 0, 0],
    },
    completed: false,
  };

  rawBoard
    .split("\n")
    .filter(Boolean)
    .forEach((rawRow, y) => {
      rawRow
        .split(" ")
        .filter(Boolean)
        .forEach((number, x) => {
          board.numbers[number] = [x, y];
        });
    });

  return board;
});

function drawNumbersUntilLastComplete() {
  let completedCount = 0;

  for (let n of numbers) {
    for (let board of boards) {
      const { completed, numbers: boardNumbers, marks: boardMarks } = board;

      if (completed || !boardNumbers[n]) {
        continue;
      }

      const [x, y] = boardNumbers[n];

      boardMarks.columns[x] += 1;
      boardMarks.rows[y] += 1;

      delete boardNumbers[n];

      if (boardMarks.columns[x] === 5 || boardMarks.rows[y] === 5) {
        board.completed = true;
        completedCount += 1;

        if (completedCount === boards.length) {
          const sum = Object.keys(boardNumbers).reduce(
            (acc, n) => acc + Number(n),
            0
          );

          return [n, sum];
        }
      }
    }
  }
}

const [n, sum] = drawNumbersUntilLastComplete();

const output = n * sum;

console.log(numbers);
console.log("→", n);
console.log("→", sum);
console.log("→", output);
