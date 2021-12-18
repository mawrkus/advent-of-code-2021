const textInput = require("./input");
const { hexaToBitsLookup, packetTypesLookup } = require("./lookups");

const input = textInput;
const bits = [...input].reduce((acc, c) => acc + hexaToBitsLookup[c], "");

const buildParser = (bits, verbose = false) => {
  let pos = 0;
  const lastPos = bits.length - 1;

  console.log("Parsing %d bits = '%s'", bits.length, bits);

  return (name, bitsCount, convertToDecimal = true) => {
    if (pos > lastPos) {
      throw Error("ParserError: end of packet!");
    }

    const slice = bits.substring(pos, pos + bitsCount);
    const value = convertToDecimal ? parseInt(slice, 2) : slice;

    if (verbose) {
      console.log("[%s] %s = %o", ("0000" + pos).slice(-4), name, value);
    }

    pos += bitsCount;

    return {
      value,
      pos,
    };
  };
};

const parse = buildParser(bits);

const parseLiteralValue = () => {
  let number = "";

  while (true) {
    const isLastGroup = parse("isLastGroup", 1, false).value === "0";
    const lastParserResult = parse("number", 4, false);

    number += lastParserResult.value;

    if (isLastGroup) {
      const literalValue = parseInt(number, 2);
      // console.log(" * literalValue =", literalValue);

      return {
        ...lastParserResult,
        literalValue,
      };
    }
  }
};

const parsePacket = () => {
  const versionNumber = parse("versionNumber", 3).value;
  // console.log(" * versionNumber =", versionNumber);

  const typeId = parse("typeId", 3).value;
  const { type, operatorFn } = packetTypesLookup[typeId];

  // console.log(" * type =", type);

  if (type === "LiteralValue") {
    return parseLiteralValue();
  }

  const lengthTypeId = parse("lengthTypeId", 1, false).value;
  const lengthType = lengthTypeId === "0" ? "BitsLength" : "SubPacketsNumber";

  // console.log(" * lengthType =", lengthType);

  let hasParsedAllSubPackets;

  if (lengthType === "BitsLength") {
    const { value: lengthInBits, pos: startPos } = parse("lengthInBits", 15);
    const endPos = startPos + lengthInBits;

    hasParsedAllSubPackets = ({ pos }) => pos >= endPos;
  } else {
    const { value: subPacketsNumber } = parse("subPacketsNumber", 11);

    hasParsedAllSubPackets = (_, i) => i >= subPacketsNumber;
  }

  const subPackets = [];

  for (let i = 1; true; i += 1) {
    const lastParserResult = parsePacket();

    subPackets.push(lastParserResult);

    if (hasParsedAllSubPackets(lastParserResult, i)) {
      // console.log(" * subPackets =", subPackets);

      return {
        ...lastParserResult,
        literalValue: operatorFn(subPackets),
      };
    }
  }
};

const output = parsePacket().literalValue;

// console.log(input);
// console.log("→", bits);
console.log("→", output);
