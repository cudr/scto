import { drop, insert } from "../utils";

export interface Replace {
  type: "replace";
  offset: number;
  shift: number;
  data: string;
}

export interface Insert {
  type: "insert";
  offset: number;
  data: string;
}

export interface Drop {
  type: "drop";
  offset: number;
  shift: number;
}

export type Operation = Replace | Insert | Drop;

export const applyOp = (str: string, operation: Operation) => {
  const { type, offset } = operation;

  const { data } = operation as Replace | Insert;
  const { shift } = operation as Replace | Drop;

  if (type === "insert") {
    return insert(str, data, offset);
  } else if (type === "drop") {
    return drop(str, offset, shift);
  } else if (type === "replace") {
    return insert(str, data, offset, shift);
  } else {
    throw new Error("Operation type is unknown!");
  }
};

export const applyOps = (str: string, ops: Array<Operation>) => {
  if (!ops.length) return str;

  const [headOp, ...tailOps] = ops;

  return applyOps(applyOp(str, headOp), tailOps);
};

export const opGen = (
  type: string,
  offset: number,
  shift: number = 0,
  data?: string
) => {
  if (type === "insert") {
    let op: Insert = { type, offset, data };
    return op;
  } else if (type === "replace") {
    let op: Replace = { type, offset, data, shift };
    return op;
  } else if (type === "drop") {
    let op: Drop = { type, offset, shift };
    return op;
  }
};
