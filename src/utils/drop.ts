export default (str: string, offset: number, shift: number = 0) =>
  str.slice(0, offset) + str.slice(offset + shift);
