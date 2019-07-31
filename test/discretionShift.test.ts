import discretionShift from "../src/compare/discretionShift";

type Item = string[][] | string[];

const pair = (pair: Item, match: any): [Item, any] => [pair, match];

const listPairs = [
  pair([[""], [""]], [0, 0]),
  pair([["", "xyz"], ["bar"]], undefined),
  pair([["", "bar"], [" "]], undefined),
  pair([["bar"], ["bar"]], [0, 0]),
  pair([["", "bar"], ["bar"]], [1, 0]),
  pair([["", "", "bar"], [" ", "bar"]], [2, 1]),
  pair([["xyz", "abc", "def", "xyz"], ["foo", "bar", "foo", "abc"]], [1, 3])
];

const stringPairs = [
  pair(["ghifoo", "xyzbarfoo"], [3, 6]),
  pair(["foo", "xyzbarfoo"], [0, 6]),
  pair(["", " x"], [1, 0]),
  pair(["   g", " x"], undefined)
];

describe("discretion shift", () => {
  it("find list shift pair", () => {
    listPairs.forEach(([left, right]) =>
      expect(discretionShift(left[0], left[1])).toStrictEqual(right)
    );
  });

  it("find string shift pair", () => {
    stringPairs.forEach(([left, right]) =>
      expect(discretionShift(left[0], left[1])).toStrictEqual(right)
    );
  });
});
