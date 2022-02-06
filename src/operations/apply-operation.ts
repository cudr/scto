import { Collate, Operation, Replace, Insert, Drop } from "./types";
import { insert, drop } from "../utils";

export const applyOp = (source: Collate, operation: Operation): Collate => {
  const { type, offset } = operation;

  const { data } = operation as Replace | Insert;
  const { shift } = operation as Replace | Drop;

  if (type === "insert") {
    return insert(source, data, offset);
  } else if (type === "drop") {
    return drop(source, offset, shift);
  } else if (type === "replace") {
    return insert(source, data, offset, shift);
  } else {
    throw new Error("Operation type is unknown!");
  }
};
