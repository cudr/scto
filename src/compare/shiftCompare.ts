import { Insert, Drop, Replace } from "../operations";

const shiftCompare = (origin, modifyed, i = 0, shift = 0) => {
  if (i >= Math.max(origin.length, modifyed.length)) return null;

  let isShorter = !origin[i];
  let isLonger = !modifyed[i];

  if (isShorter || origin[i] === modifyed[i + shift]) {
    let op: Insert = {
      type: "insert",
      offset: i,
      data: modifyed.slice(i, isShorter ? modifyed.length : i + shift)
    };
    return op;
  } else if (origin[i + shift] === modifyed[i + shift]) {
    let op: Replace = {
      type: "replace",
      offset: i,
      shift: shift,
      data: modifyed.slice(i, i + shift)
    };
    return op;
  } else if (isLonger || origin[i + shift] === modifyed[i]) {
    let op: Drop = {
      type: "drop",
      offset: i,
      shift: isLonger ? origin.length - i : shift
    };
    return op;
  }

  return shiftCompare(origin, modifyed, i, shift + 1);
};

export default shiftCompare;
