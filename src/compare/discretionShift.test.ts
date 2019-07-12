import discretionShift from "./discretionShift";

describe("discretion shift", () => {
  it("find list shift pair", () => {
    expect(discretionShift([""], [""])).toStrictEqual([0, 0]);
    expect(discretionShift(["", "xyz"], ["bar"])).toBe(undefined);
    expect(discretionShift(["", "bar"], [" "])).toBe(undefined);
    expect(discretionShift(["bar"], ["bar"])).toStrictEqual([0, 0]);
    expect(discretionShift(["", "bar"], ["bar"])).toStrictEqual([1, 0]);
    expect(discretionShift(["", "", "bar"], [" ", "bar"])).toStrictEqual([
      2,
      1
    ]);
    expect(
      discretionShift(
        ["xyz", "abc", "def", "xyz"],
        ["foo", "bar", "foo", "abc"]
      )
    ).toStrictEqual([1, 3]);
  });

  it("find string shift pair", () => {
    expect(discretionShift("ghifoo", "xyzbarfoo")).toStrictEqual([3, 6]);
    expect(discretionShift("foo", "xyzbarfoo")).toStrictEqual([0, 6]);
    expect(discretionShift("", " x")).toStrictEqual([1, 0]);
    expect(discretionShift("   g", " x")).toBe(undefined);
  });
});
