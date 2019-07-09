import sourceDiffToOps from "./sourceDiffToOps";
import { applyOps } from "../operations";

let origin =
  "Yet far hath!!! fought with nature, That you with wisest apple - think on him, Together me remembrance of ourselves!";
let modifyed =
  "Yet so far hath discretion fought with nature That we with wisest sorrow — think on him, Together with remembrance of ourselves.";

describe("diff to operations", () => {
  it("diff equals", () => {
    const operations = sourceDiffToOps(origin, modifyed);
    const applyed = applyOps(origin, operations);

    console.log("operations", operations);
    console.log("applyed", applyed);

    expect(applyed).toBe(modifyed);
  });
});
