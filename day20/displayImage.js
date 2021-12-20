function displayImage(label, image) {
  console.log(`${label}: %dx%d`, image[0].length, image.length);

  for (let y = 0; y < image.length; y += 1) {
    const line = [...image[y]].reduce(
      (acc, pixel) => acc + (pixel === "1" ? "#" : "."),
      ""
    );

    console.log(line);
  }

  console.log();
}

module.exports = {
  displayImage,
};
