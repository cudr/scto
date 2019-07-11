import { opGen, Collate, Operation } from "../operations";

import discretionShift from "./discretionShift";

const shiftCompare = (
  origin: Collate,
  modifyed: Collate,
  i: number = 0
): Operation | null => {
  if (i >= Math.max(origin.length, modifyed.length)) return null;

  if (!origin[i]) {
    return opGen("insert", i, null, modifyed.slice(i, modifyed.length));
  } else if (!modifyed[i]) {
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

  if (shiftPair[1] === 0) {
    return opGen("drop", i, shiftPair[0]);
  } else if (shiftPair[0] === 0) {
    return opGen("insert", i, null, modifyed.slice(i, i + shiftPair[1]));
  } else {
    let shift = Math.min(...shiftPair);
    return opGen("replace", i, shift, modifyed.slice(i, i + shift));
  }
};

export default shiftCompare;
