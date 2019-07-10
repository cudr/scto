import { drop, insert } from "../utils";

export type Collate = string[] | string;

export interface Replace {
  type: "replace";
  offset: number;
  shift: number;
  data: Collate;
}

export interface Insert {
  type: "insert";
  offset: number;
  data: Collate;
}

export interface Drop {
  type: "drop";
  offset: number;
  shift: number;
}

export type Operation = Replace | Insert | Drop;

export const applyOp = (source: Collate, operation: Operation) => {
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

export const applyOps = (source: Collate, ops: Array<Operation>) => {
  if (!ops.length) return source;

  const [headOp, ...tailOps] = ops;

  return applyOps(applyOp(source, headOp), tailOps);
};

export const opGen = (
  type: string,
  offset: number,
  shift: number = 0,
  data?: Collate
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
