const textInput = require("./input");

const input = textInput
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split("-"));

const isSmallCave = (name) => name.toLowerCase() === name;

const destinations = input.reduce((acc, [start, end]) => {
  if (start !== "end" && end !== "start") {
    acc[start] = acc[start] || [];

    acc[start].push({
      name: end,
      isSmallCave: isSmallCave(end),
    });
  }

  if (end !== "end" && start !== "start") {
    acc[end] = acc[end] || [];

    acc[end].push({
      name: start,
      isSmallCave: isSmallCave(start),
    });
  }

  return acc;
}, {});

function pathsFinder(
  location = { name: "start", isSmallCave: true },
  currentPath = ["start"],
  visits = {}
) {
  if (location.name === "end") {
    return [currentPath];
  }

  visits = {
    ...visits,
    [location.name]: location.isSmallCave,
  };

  return destinations[location.name]
    .filter((location) => !visits[location.name])
    .reduce(
      (acc, nextLocation) =>
        acc.concat(
          pathsFinder(nextLocation, [...currentPath, nextLocation.name], visits)
        ),
      []
    );
}

const paths = pathsFinder();

const output = paths.length;

console.log(input);
console.log("→", destinations);
// console.log("→", paths);
console.log("→", output);
