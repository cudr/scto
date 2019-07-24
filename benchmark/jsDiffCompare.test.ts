import { diffWordsWithSpace, diffChars } from "diff";
import stringDiffToOps from "../src/compare/stringDiffToOps";
import { applyOps } from "../src/operations";
import { genSentences, randomizeText } from "./index";

describe("benchmark jsdiff compare", () => {
  const origin = genSentences(100);
  const modifyed = randomizeText(origin);

  console.time("csto stringDiffToOps");
  const operations = stringDiffToOps(origin, modifyed);
  console.timeEnd("csto stringDiffToOps");

  console.time("jsdiff diffWordsWithSpace");
  const diff = diffWordsWithSpace(origin, modifyed);
  console.timeEnd("jsdiff diffWordsWithSpace");

  const result = diff.reduce(
    (acc: any, el) => (el.removed ? acc : acc + el.value),
    ""
  );

  it("string scto equals", () => {
    expect(applyOps(origin, operations)).toBe(modifyed);
  });

  it("string jsdiff equals", () => {
    expect(result).toBe(modifyed);
  });
});
