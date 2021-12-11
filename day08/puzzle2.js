const textInput = require("./input");
const { segmentsCountToDigitsLookup } = require("./lookups");
const { intersectArrays, combineGenerator } = require("./utils");

const input = textInput
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    const [signals, values] = line.split("|");
    return {
      inputSignals: signals.match(/[a-g]+/g),
      outputDigits: values.match(/[a-g]+/g),
    };
  });

function buildConnections(guess, connections) {
  const inverseLookup = {};

  for (let { encoded, segments } of guess) {
    for (let segment of [...encoded]) {
      connections[segment] = intersectArrays(connections[segment], segments);

      if (!connections[segment].length) {
          return null; // discarded because impossible
      }

      if (connections[segment].length === 1) {
        const [decoded] = connections[segment];

        if (inverseLookup[decoded] && inverseLookup[decoded] !== segment) {
          return null; // discarded because incompatible
        }

        inverseLookup[decoded] = segment;
      }
    }
  }

  return connections;
}

function verifyGuess(guess) {
  const connections = buildConnections(guess, {
    a: ["a", "b", "c", "d", "e", "f", "g"],
    b: ["a", "b", "c", "d", "e", "f", "g"],
    c: ["a", "b", "c", "d", "e", "f", "g"],
    d: ["a", "b", "c", "d", "e", "f", "g"],
    e: ["a", "b", "c", "d", "e", "f", "g"],
    f: ["a", "b", "c", "d", "e", "f", "g"],
    g: ["a", "b", "c", "d", "e", "f", "g"],
  });

  return Boolean(connections);
}

function decodeEntry(inputDigits, outputDigits) {
  const uniqueSignals = [...inputDigits, ...outputDigits].reduce((acc, { encoded, decoded }) => ({
    ...acc,
    [encoded]: decoded.map((decoded) => ({
      encoded,
      ...decoded,
    })),
  }), {});

  // for each encoded signal, select a possible digit
  // with all the selected digits (a guess), try to build the corresponding connections
  // if the connections are valid -> done
  // if the connections are invalid, repeat with the next combination of possible digits
  const combine = combineGenerator(Object.entries(uniqueSignals).map(([, p]) => p));

  let guess = [];
  let isGuessValid = false;

  do {
    guess = combine.next().value; // [{ encoded: 'be', value: 1, segments: ['c', 'f'] }, ...]
    isGuessValid = verifyGuess(guess);
  } while (!isGuessValid);

  const decodedValues = guess.reduce((acc, { encoded, value }) => ({
    ...acc,
    [encoded]: value,
  }), {});

  return Number(
    outputDigits.map(({ encoded }) => decodedValues[encoded]).join("")
  );
}


let output = 0;

for (let entry of input) {
  let outputValue = 0;

  // check if output values can be directly mapped (unique number of segments)
  const possibleOutputDigits = entry.outputDigits.map((digit) => ({
    encoded: [...digit].sort().join(""),
    decoded: segmentsCountToDigitsLookup[digit.length], // { value: 1, segments: ['c', 'f'] }
  }));

  if (possibleOutputDigits.every(({ decoded }) => decoded.length === 1)) {
    outputValue = Number(
      possibleOutputDigits.map(({ decoded }) => decoded[0].value).join("")
    );
  } else {
    // decode the values
    const possibleInputDigits = entry.inputSignals.map((digit) => ({
      encoded: [...digit].sort().join(""),
      decoded: segmentsCountToDigitsLookup[digit.length], // { value: 2, segments: ['a','c','d','e','g'] }
    }));

    outputValue = decodeEntry(possibleInputDigits, possibleOutputDigits);
  }

  console.log("→", outputValue);

  output += outputValue;
}

// console.log(input);
console.log("→", output);
