function intersectArrays(arr1, arr2) {
  if (arr2.length > arr1.length) {
    [arr1, arr2] = [arr2, arr1];
  }

  const obj1 = arr1.reduce(
    (acc, letter) => ({
      ...acc,
      [letter]: true,
    }),
    {}
  );

  const intersection = [];

  arr2.forEach((letter) => {
    if (obj1[letter]) {
      intersection.push(letter);
    }
  });

  return intersection;
}

function* combineGenerator(list, current = [], i = 0) {
  if (!list[i]) {
    yield current;
    return;
  }

  for (let d of list[i]) {
    if (current.find(({ value }) => d.value === value)) {
      continue;
    }

    current.push(d);
    yield* combineGenerator(list, current, i + 1);
    current.pop();
  }
}

module.exports = {
  intersectArrays,
  combineGenerator,
};
