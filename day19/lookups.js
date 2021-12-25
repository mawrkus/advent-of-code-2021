const orientationsLookup = [
  // facing x
  // > 0
  ([x, y, z]) => [x, y, z], //
  ([x, y, z]) => [x, -z, y], //
  ([x, y, z]) => [x, -y, -z], //
  ([x, y, z]) => [x, z, -y], //

  // < 0
  ([x, y, z]) => [-x, y, -z], //
  ([x, y, z]) => [-x, z, y], //
  ([x, y, z]) => [-x, -y, z], //
  ([x, y, z]) => [-x, -z, -y], //

  // facing y
  // > 0
  ([x, y, z]) => [y, z, x], //
  ([x, y, z]) => [y, -x, z], //
  ([x, y, z]) => [y, -z, -x], //
  ([x, y, z]) => [y, x, -z], //

  // < 0
  ([x, y, z]) => [-y, z, -x], //
  ([x, y, z]) => [-y, x, z], //
  ([x, y, z]) => [-y, -z, x], //
  ([x, y, z]) => [-y, -x, -z], //

  // facing z
  // > 0
  ([x, y, z]) => [z, -y, x], //
  ([x, y, z]) => [z, -x, -y], //
  ([x, y, z]) => [z, y, -x], //
  ([x, y, z]) => [z, x, y], //

  // < 0
  ([x, y, z]) => [-z, -y, -x], //
  ([x, y, z]) => [-z, x, -y],//
  ([x, y, z]) => [-z, y, x], //
  ([x, y, z]) => [-z, -x, y], //
];

module.exports = {
  orientationsLookup,
};
