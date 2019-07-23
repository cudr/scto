import { Collate, Operation } from "./types";
import applyOp from "./applyOp";

const applyOps = (source: Collate, ops: Operation[]): Collate => {
  let i = 0,
    len = ops.length;

  if (!len) return source;

  for (i; i < len; i++) {
    const [headOp, ...tailOps] = ops;

    source = applyOp(source, headOp);

    ops = tailOps;
  }

  return source;
};

export default applyOps;
