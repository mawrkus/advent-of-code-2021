function displayPath(input, path) {
  console.log();

  const paths = path.reduce((acc, pos) => ({ ...acc, [pos]: true }), {});

  for (let y = 0; y < input.length; y += 1) {
    const line = input[y]
      .reduce((acc, risk, x) => acc + (paths[[x, y]]
          ? `\u001b[37;1m${risk}\u001b[0m`
          : risk),
        ""
      );

    console.log(line);
  }

  console.log();
}

module.exports = {
  displayPath,
};
