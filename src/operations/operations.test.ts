import {
  applyOperation,
  applyOperations,
  Replace,
  Insert,
  Drop
} from "./index";

const brickInsert: Insert = {
  type: "insert",
  offset: 1,
  data: "xyz"
};

const brickReplace: Replace = {
  type: "replace",
  offset: 3,
  shift: 2,
  data: "bar"
};

const brickDrop: Drop = {
  type: "drop",
  offset: 2,
  shift: 2
};

describe("apply operations", () => {
  it("apply insert", () => {
    expect(applyOperation("foo", brickInsert)).toBe("fxyzoo");
    expect(applyOperation("bar", brickInsert)).toBe("bxyzar");
  });

  it("apply replace", () => {
    expect(applyOperation("fooxyz", brickReplace)).toBe("foobarz");
  });

  it("apply drop", () => {
    expect(applyOperation("fooxyz", brickDrop)).toBe("foyz");
  });

  it("apply list operations", () => {
    expect(applyOperations("foo", [brickInsert, brickReplace, brickDrop])).toBe(
      "fxaro"
    );
  });
});
