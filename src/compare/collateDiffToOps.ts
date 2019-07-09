import shiftCompare from "./shiftCompare";
import { drop, insert } from "../utils";

import { Operation, Collate, Replace, Insert, Drop } from "../operations";

const collateDiffToOps = (origin: Collate, modifyed: Collate) => {
  const maxLen = Math.max(origin.length, modifyed.length),
    operations = [];

  let i = 0;

  for (i; i < maxLen; i++) {
    let operation: Operation =
      origin[i] !== modifyed[i] && shiftCompare(origin, modifyed, i);

    if (operation) {
      operations.push(operation);

      const { type } = operation;

      const { data } = operation as Replace | Insert;
      const { shift } = operation as Replace | Drop;

      if (type === "insert") {
        origin = insert(origin, data, i);
        i += data.length;
      } else if (type === "replace") {
        origin = insert(origin, data, i, shift);
      } else if (type === "drop") {
        origin = drop(origin, i, shift);
      }
    }
  }

  return operations;
};

export default collateDiffToOps;
