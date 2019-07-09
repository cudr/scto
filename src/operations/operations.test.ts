import { applyOp, applyOps, opGen } from "./index";

describe("apply operations", () => {
  it("apply insert", () => {
    expect(applyOp("foo", opGen("insert", 1, null, "xyz"))).toBe("fxyzoo");
    expect(applyOp("bar", opGen("insert", 2, null, "xyz"))).toBe("baxyzr");
    expect(applyOp("bar", opGen("insert", 0, null, "xyz"))).toBe("xyzbar");
  });

  it("apply replace", () => {
    expect(applyOp("fooxyz", opGen("replace", 3, 2, "bar"))).toBe("foobarz");
    expect(applyOp("fooxyz", opGen("replace", 1, 4, "bar"))).toBe("fbarz");
    expect(applyOp("fooxyz", opGen("replace", 0, 4, ""))).toBe("yz");
  });

  it("apply drop", () => {
    expect(applyOp("fooxyz", opGen("drop", 1, 3))).toBe("fyz");
    expect(applyOp("fooxyz", opGen("drop", 0, 4))).toBe("yz");
    expect(applyOp("fooxyz", opGen("drop", 3, 3))).toBe("foo");
  });
});

test("apply list operations", () => {
  expect(
    applyOps("foo", [
      opGen("insert", 0, null, "bar"),
      opGen("replace", 2, 2, "xyz"),
      opGen("drop", 5, 1)
    ])
  ).toBe("baxyzo");
});
