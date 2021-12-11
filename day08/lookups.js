const digitToSegmentsLookup = [
  ["a", "b", "c", "e", "f", "g"],       // 0
  ["c", "f"],                           // 1
  ["a", "c", "d", "e", "g"],            // 2
  ["a", "c", "d", "f", "g"],            // 3
  ["b", "c", "d", "f"],                 // 4
  ["a", "b", "d", "f", "g"],            // 5
  ["a", "b", "d", "e", "f", "g"],       // 6
  ["a", "c", "f"],                      // 7
  ["a", "b", "c", "d", "e", "f", "g"],  // 8
  ["a", "b", "c", "d", "f", "g"],       // 9
];

const segmentsCountToDigitsLookup = digitToSegmentsLookup.reduce(
  (acc, segments, value) => {
    const { length } = segments;
    acc[length] = acc[length] || [];
    acc[length].push({ value, segments });
    return acc;
  },
  {}
);

module.exports = {
  segmentsCountToDigitsLookup,
};
