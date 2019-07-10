import { Collate } from "../operations";

export type Shift = [number, number] | null;

const discretionShift = (one: Collate, two: Collate) => {
  const accOne = {},
    accTwo = {},
    max = Math.max(one.length, two.length);

  let i: number = 0;

  if (one[i] === two[i]) return [0, 0];

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
