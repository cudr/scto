import collateDiffToOps from "./collateDiffToOps";

import { drop, insert } from "../utils";

import { Operation, Replace, Drop } from "../operations";

const stringDiffToOps = (
  origin: string,
  modifyed: string,
  split = " "
): Operation[] => {
  let originList: string[] = origin.split(split);
  let modifyedList: string[] = modifyed.split(split);

  const listOps = collateDiffToOps(originList, modifyedList);

  let operations = [],
    i = 0,
    totalOffset = 0,
    listOffset = 0;

  for (i; i < listOps.length; i++) {
    const op = listOps[i];

    while (listOffset < op.offset) {
      totalOffset += originList[listOffset].length + split.length;
      listOffset += 1;
    }

    const { type, offset } = op;
    const { shift = 0 } = op as Replace | Drop;

    const data = originList.slice(offset, offset + shift);

    if (type === "drop") {
      operations.push({
        type,
        offset: totalOffset,
        shift: data.join(split).length + split.length
      });

      originList = drop(originList, listOffset, shift);
    } else if (type === "insert") {
      const data = op.data.join(split) + split;

      operations.push({
        type,
        offset: totalOffset,
        data
      });

      originList = insert(originList, op.data, listOffset);
    } else if (type === "replace") {
      const ops: Operation[] = collateDiffToOps(
        data.join(split),
        op.data.join(split)
      );

      ops.forEach(o => {
        operations.push({
          ...o,
          offset: totalOffset + o.offset
        });
      });

      originList = insert(originList, op.data, listOffset, shift);
    }
  }

  return operations;
};

export default stringDiffToOps;
