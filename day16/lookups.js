const hexaToBitsLookup = {
  "0": "0000",
  "1": "0001",
  "2": "0010",
  "3": "0011",
  "4": "0100",
  "5": "0101",
  "6": "0110",
  "7": "0111",
  "8": "1000",
  "9": "1001",
  "A": "1010",
  "B": "1011",
  "C": "1100",
  "D": "1101",
  "E": "1110",
  "F": "1111",
};

const packetTypesLookup = {
  4: {
    type: "LiteralValue",
    operatorFn: null,
  },
  0: {
    type: "Sum",
    operatorFn: (packets) =>
      packets.reduce((acc, { literalValue }) => acc + literalValue, 0),
  },
  1: {
    type: "Product",
    operatorFn: (packets) =>
      packets.reduce((acc, { literalValue }) => acc * literalValue, 1),
  },
  2: {
    type: "Minimum",
    operatorFn: (packets) =>
      packets.reduce(
        (acc, { literalValue }) => (literalValue < acc ? literalValue : acc),
        Infinity
      ),
  },
  3: {
    type: "Maximum",
    operatorFn: (packets) =>
      packets.reduce(
        (acc, { literalValue }) => (literalValue > acc ? literalValue : acc),
        -Infinity
      ),
  },
  5: {
    type: "GreaterThan",
    operatorFn: ([p1, p2]) => (p1.literalValue > p2.literalValue ? "1" : "0"),
  },
  6: {
    type: "LessThan",
    operatorFn: ([p1, p2]) => (p1.literalValue < p2.literalValue ? "1" : "0"),
  },
  7: {
    type: "EqualTo",
    operatorFn: ([p1, p2]) => (p1.literalValue === p2.literalValue ? "1" : "0"),
  },
};

module.exports = {
  hexaToBitsLookup,
  packetTypesLookup,
};
