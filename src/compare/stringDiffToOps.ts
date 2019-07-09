import shiftCompare from "./shiftCompare";
import { drop, insert } from "../utils";

const stringDiffToOps = (origin, modifyed) => {
  const maxLen = Math.max(origin.length, modifyed.length),
    operations = [];

  let i = 0;

  for (i; i < maxLen; i++) {
    let operation =
      origin[i] !== modifyed[i] && shiftCompare(origin, modifyed, i);

    if (operation) {
      operations.push(operation);

      const { type, data, shift } = operation;

      if (type === "insert") {
        origin = insert(origin, data, i);
        i += data.length;
      } else if (type === "replace") {
        origin = insert(origin, data, i, shift);
        i += shift;
      } else if (type === "drop") {
        origin = drop(origin, i, shift);
      }
    }
  }

  return operations;
};

export default stringDiffToOps;
