export default (source, offset: number, shift: number = 0) =>
  source.slice(0, offset).concat(source.slice(offset + shift));
