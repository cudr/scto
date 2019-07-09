import { Insert, Drop, Replace, Collate } from "../operations";

import discretionShift from "./discretionShift";

const shiftCompare = (origin: Collate, modifyed: Collate, i: number = 0) => {
  if (i >= Math.max(origin.length, modifyed.length)) return null;

  if (!origin[i]) {
    let op: Insert = {
      type: "insert",
      offset: i,
      data: modifyed.slice(i, modifyed.length)
    };
    return op;
  } else if (!modifyed[i]) {
    let op: Drop = {
      type: "drop",
      offset: i,
      shift: origin.length - i
    };
    return op;
  }

  const shiftPair = discretionShift(origin.slice(i), modifyed.slice(i));

  if (!shiftPair) {
    let op: Replace = {
      type: "replace",
      offset: i,
      shift: origin.length - i,
      data: modifyed.slice(i, modifyed.length)
    };
    return op;
  }

  if (shiftPair[1] === 0) {
    let op: Drop = {
      type: "drop",
      offset: i,
      shift: shiftPair[0]
    };
    return op;
  } else if (shiftPair[0] === 0) {
    let op: Insert = {
      type: "insert",
      offset: i,
      data: modifyed.slice(i, i + shiftPair[1])
    };
    return op;
  } else {
    let shift = Math.min(...shiftPair);
    let op: Replace = {
      type: "replace",
      offset: i,
      shift,
      data: modifyed.slice(i, i + shift)
    };
    return op;
  }
};

export default shiftCompare;
