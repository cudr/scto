import { Operation, Collate, Insert, Replace, Drop } from './types'

export const opGen = (
  type: string,
  offset: number,
  shift: null | number = 0,
  data?: Collate
): Operation => {
  if (type === 'insert') {
    return { type, offset, data } as Insert
  } else if (type === 'replace') {
    return { type, offset, data, shift } as Replace
  } else {
    return { type: 'drop', offset, shift } as Drop
  }
}
