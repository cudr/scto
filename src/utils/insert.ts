export default (source, data, offset: number, shift: number = 0) =>
  source
    .slice(0, offset)
    .concat(data)
    .concat(source.slice(offset + shift));
