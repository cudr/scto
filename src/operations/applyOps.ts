import { Collate, Operation } from "./types";
import applyOp from "./applyOp";

const applyOps = (source: Collate, ops: Operation[]): Collate => {
  if (!ops.length) return source;

  const [headOp, ...tailOps] = ops;

  return applyOps(applyOp(source, headOp), tailOps);
};

export default applyOps;
