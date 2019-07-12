import { Collate } from "../operations";
import { Keyed, Shift } from "./types";

const discretionShift = (one: Collate, two: Collate): Shift => {
  const accOne: Keyed = {},
    accTwo: Keyed = {},
    max = Math.max(one.length, two.length);

  let i: number = 0;

  if (one[i] === two[i]) return [0, 0];

  if (!one[i] && one.length <= i) return [1, 0];
  if (!two[i] && two.length <= i) return [0, 1];

  for (i; i < max; i++) {
    if (!accOne.hasOwnProperty(one[i])) accOne[one[i]] = i;

    if (accOne.hasOwnProperty(two[i])) {
      return [accOne[two[i]], i];
    }

    if (!accTwo.hasOwnProperty(two[i])) accTwo[two[i]] = i;

    if (accTwo.hasOwnProperty(one[i])) {
      return [i, accTwo[one[i]]];
    }
  }
};

export default discretionShift;
