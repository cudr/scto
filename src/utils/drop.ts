import { Collate } from "../operations";

export default (source: Collate, offset: number, shift: number = 0): Collate =>
  (source.slice(0, offset) as any).concat(source.slice(offset + shift));
