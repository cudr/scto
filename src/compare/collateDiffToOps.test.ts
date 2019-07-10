import collateDiffToOps from "./collateDiffToOps";
import { applyOps } from "../operations";

let origin =
  "Yet far hath!!! fought with nature, That you with wisest apple - think on him, Together me remembrance banana of ourselves!";
let modifyed =
  "Yet so far hath discretion fought with nature That we with wisest sorrow — think on him, Together with remembrance of ourselves.";

describe("source diff to operations", () => {
  it("list diff equals", () => {
    const one = origin.split(" ");
    const two = modifyed.split(" ");

    const applyed = applyOps(one, collateDiffToOps(one, two));

    expect(applyed).toStrictEqual(two);
  });

  it("string diff equals", () => {
    const applyed = applyOps(origin, collateDiffToOps(origin, modifyed));

    expect(applyed).toStrictEqual(modifyed);
  });
});
