import shiftCompare from "./shiftCompare";
import { opGen } from "../operations";

describe("shift compare", () => {
  it("take insert", () => {
    expect(shiftCompare("foo", "foobar", 3)).toBe(
      opGen("insert", 3, null, "bar")
    );
    expect(shiftCompare("foo", "fbaroo", 1)).toBe(
      opGen("insert", 1, null, "bar")
    );
  });

  it("take drop", () => {
    expect(shiftCompare("fbaroo", "foo", 1)).toBe(opGen("drop", 1, 3));
  });

  it("take replace", () => {
    expect(shiftCompare("fooxyzbar", "fooabcbar", 3)).toBe(
      opGen("replace", 3, 3, "abc")
    );
  });
});
