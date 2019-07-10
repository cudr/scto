import stringDiffToOps from "./stringDiffToOps";
import { applyOps } from "../operations";

let origin =
  "early Yet far hath!!! fought with great nature, That you with wisest apple - think on him, Together me remembrance bananas of ourselves! later";
let modifyed =
  "Yet so far hath discretion fought with nature That we with wisest sorrow — think on him, Together with remembrance of ourselves.";

describe("string diff to operations", () => {
  it("string diff equals", () => {
    expect(applyOps(origin, stringDiffToOps(origin, modifyed))).toBe(modifyed);
  });
});
