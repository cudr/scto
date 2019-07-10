import shiftCompare from "./shiftCompare";
import { opGen } from "../operations";

describe("string shift compare", () => {
  it("take insert", () => {
    expect(shiftCompare("foo", "foobar", 3)).toStrictEqual(
      opGen("insert", 3, null, "bar")
    );
    expect(shiftCompare("foo", "fbaroo", 1)).toStrictEqual(
      opGen("insert", 1, null, "bar")
    );
    expect(shiftCompare("foo", "ffoo", 1)).toStrictEqual(
      opGen("insert", 1, null, "f")
    );
    expect(shiftCompare("foo", "foofoo", 3)).toStrictEqual(
      opGen("insert", 3, null, "foo")
    );
    expect(shiftCompare("foo", "bazfoo", 0)).toStrictEqual(
      opGen("insert", 0, null, "baz")
    );
  });

  it("take drop", () => {
    expect(shiftCompare("fbaroo", "foo", 1)).toStrictEqual(opGen("drop", 1, 3));
    expect(shiftCompare("foofoo", "foo", 3)).toStrictEqual(opGen("drop", 3, 3));
    expect(shiftCompare("foobazfoo", "foofoo", 3)).toStrictEqual(
      opGen("drop", 3, 3)
    );
    expect(shiftCompare("bazfoo", "foo", 0)).toStrictEqual(opGen("drop", 0, 3));
  });

  it("take replace", () => {
    expect(shiftCompare("fooxyzbar", "fooabcbar", 3)).toStrictEqual(
      opGen("replace", 3, 3, "abc")
    );
    expect(shiftCompare("fooxyzbar", "fmtrdeger", 1)).toStrictEqual(
      opGen("replace", 1, 7, "mtrdege")
    );
    expect(shiftCompare("dfoobar", "dxyzbar", 1)).toStrictEqual(
      opGen("replace", 1, 3, "xyz")
    );
  });
});

describe("list shift compare", () => {
  it("take insert", () => {
    expect(
      shiftCompare(["foo", "baz"], ["foo", "bar", "baz"], 1)
    ).toStrictEqual(opGen("insert", 1, null, ["bar"]));
  });

  it("take drop", () => {
    expect(shiftCompare(["foo", "bar", "foo"], ["foo"], 1)).toStrictEqual(
      opGen("drop", 1, 2)
    );
  });

  it("take replace", () => {
    expect(
      shiftCompare(["foo", "xyz", "bar"], ["foo", "abc", "bar"], 1)
    ).toStrictEqual(opGen("replace", 1, 1, ["abc"]));
  });
});
