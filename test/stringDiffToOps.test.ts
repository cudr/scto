import stringDiffToOps from "../src/compare/stringDiffToOps";
import { applyOps } from "../src/operations";
import { origin, modifyed } from "./text_source";

describe("string diff to operations", () => {
  it("string diff equals", () => {
    expect(applyOps(origin, stringDiffToOps(origin, modifyed))).toBe(modifyed);
  });
});
