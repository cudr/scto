import { Insert, Drop, Replace } from "../operations";

const shiftCompare = (origin, modifyed, i = 0, shift = 1) => {
  if (i >= origin.length || i >= modifyed.length) return null;

  if (origin[i + shift] === modifyed[i + shift]) {
    let op: Replace = {
      type: "replace",
      offset: i,
      shift: shift - 1,
      data: modifyed.slice(i, shift)
    };
    return op;
  } else if (origin[i] === modifyed[i + shift]) {
    let op: Insert = {
      type: "insert",
      offset: i,
      data: modifyed.slice(i, shift)
    };
    return op;
  } else if (origin[i + shift] === modifyed[i]) {
    let op: Drop = {
      type: "drop",
      offset: i,
      shift: shift
    };
    return op;
  }

  return shiftCompare(origin, modifyed, i, shift + 1);
};

export default shiftCompare;
