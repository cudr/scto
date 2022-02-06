import { opGen, Collate, Operation } from "../operations";

import { discretionShift } from "./discretion-shift";

export const shiftCompare = (
  origin: Collate,
  modifyed: Collate,
  i: number = 0
): Operation | null => {
  if (i >= Math.max(origin.length, modifyed.length)) return null;

  if (typeof origin[i] === "undefined") {
    return opGen("insert", i, null, modifyed.slice(i, modifyed.length));
  } else if (typeof modifyed[i] === "undefined") {
    return opGen("drop", i, origin.length - i);
  }

  const shiftPair = discretionShift(origin.slice(i), modifyed.slice(i));

  if (!shiftPair)
    return opGen(
      "replace",
      i,
      origin.length - i,
      modifyed.slice(i, modifyed.length)
    );

  if (shiftPair[0] === 0 && shiftPair[1] === 0) return null;

  if (shiftPair[1] === 0) {
    return opGen("drop", i, shiftPair[0]);
  } else if (shiftPair[0] === 0) {
    return opGen("insert", i, null, modifyed.slice(i, i + shiftPair[1]));
  } else {
    let shift = Math.min(...shiftPair);
    return opGen("replace", i, shiftPair[0], modifyed.slice(i, i + shift));
  }
};
