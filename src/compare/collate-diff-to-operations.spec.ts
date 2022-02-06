import { collateDiffToOps } from "./collate-diff-to-operations";
import { applyOps } from "../operations";

import { origin, modifyed } from "../../text-source";

describe("source diff to operations", () => {
  it("list diff equals one", () => {
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
