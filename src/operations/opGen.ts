import { Operation, Collate, Insert, Replace, Drop } from "./types";

const opGen = (
  type: string,
  offset: number,
  shift: null | number = 0,
  data?: Collate
): Operation => {
  if (type === "insert") {
    let op: Insert = { type, offset, data };
    return op;
  } else if (type === "replace") {
    let op: Replace = { type, offset, data, shift };
    return op;
  } else {
    let op: Drop = { type: "drop", offset, shift };
    return op;
  }
};

export default opGen;
