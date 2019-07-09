import stringDiffToOps from "./stringDiffToOps";
import { applyOps } from "../operations";

let origin =
  "Yet far hath!!! fought with nature, That you with wisest apple - think on him, Together me remembrance of ourselves!";
let modifyed =
  "Yet so far hath discretion fought with nature That we with wisest sorrow — think on him, Together with remembrance of ourselves.";

describe("string diff to operations", () => {
  it("string diff equals", () => {
    const operations = stringDiffToOps(origin, modifyed);
    const applyed = applyOps(origin, operations);

    expect(applyed).toBe(modifyed);
  });
});
