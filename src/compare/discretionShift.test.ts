import discretionShift, { Shift } from "./discretionShift";

let origin = ["xyz", "abc", "def", "xyz"];
let modifyed = ["foo", "bar", "foo", "abc"];

describe("discretion shift", () => {
  it("find lists shift", () => {
    expect(discretionShift(["bar"], ["bar"])).toStrictEqual([0, 0]);
    expect(discretionShift(origin, modifyed)).toStrictEqual([1, 3]);
  });

  it("find strings shift", () => {
    expect(discretionShift("ghifoo", "xyzbarfoo")).toStrictEqual([3, 6]);
  });
});
