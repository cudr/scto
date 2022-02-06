import { Collate } from '../operations'

export const insert = (
  source: Collate,
  data: Collate,
  offset: number,
  shift: number = 0
): Collate =>
  (source as any)
    .slice(0, offset)
    .concat(data)
    .concat(source.slice(offset + shift))
