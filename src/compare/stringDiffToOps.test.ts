import stringDiffToOps from "./stringDiffToOps";
import { applyOps } from "../operations";
import { origin, modifyed } from "../test";

describe("string diff to operations", () => {
  it("string diff equals", () => {
    expect(applyOps(origin, stringDiffToOps(origin, modifyed))).toBe(modifyed);
  });
});
