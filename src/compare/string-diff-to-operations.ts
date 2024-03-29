import { collateDiffToOps } from './collate-diff-to-operations'

import { drop, insert } from '../utils'

import { opGen, Operation, Replace, Insert, Drop } from '../operations'

export const stringDiffToOps = (
  origin: string,
  modifyed: string,
  split = ' '
): Operation[] => {
  let originList: string[] = origin.split(split)
  let modifyedList: string[] = modifyed.split(split)

  const listOps: Operation[] = collateDiffToOps(originList, modifyedList)

  let operations = [],
    i = 0,
    totalOffset = 0,
    listOffset = 0

  for (i; i < listOps.length; i++) {
    const op = listOps[i]

    while (listOffset < op.offset) {
      totalOffset += originList[listOffset].length + split.length
      listOffset += 1
    }

    const { type, offset } = op
    const { shift = 0 } = op as Replace | Drop

    const dataOp = op as Insert | Replace

    const data: string[] = dataOp.data as string[]

    const listData = originList.slice(offset, offset + shift)

    if (type === 'drop') {
      const isLast = listOps.length - i === 1

      const opShift = listData.join(split).length + split.length

      operations.push(
        opGen(type, isLast ? totalOffset - 1 : totalOffset, opShift)
      )

      originList = drop(originList, listOffset, shift) as string[]
    } else if (type === 'insert') {
      const d = data.join(split)

      operations.push(
        opGen(
          type,
          totalOffset,
          null,
          i === listOps.length - 1 && listOffset === originList.length
            ? split + d
            : d + split
        )
      )

      originList = insert(originList, data, listOffset) as string[]
    } else if (type === 'replace') {
      const ops: Operation[] = collateDiffToOps(
        listData.join(split),
        data.join(split)
      )

      ops.forEach(({ type, offset, shift, data }) =>
        operations.push(opGen(type, totalOffset + offset, shift, data))
      )

      originList = insert(originList, data, listOffset, shift) as string[]
    }
  }

  return operations
}
