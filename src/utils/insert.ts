export default (
  str: string,
  substr: string,
  offset: number,
  shift: number = 0
) => str.slice(0, offset) + substr + str.slice(offset + shift);
