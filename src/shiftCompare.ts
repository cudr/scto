const shiftCompare = (str1, str2, i = 0, shift = 1) => {
  if (i >= str1.length || i >= str2.length) return null;

  if (str1[i + shift] === str2[i + shift]) {
    return {
      type: "replace",
      offset: i + shift - 1
    };
  } else if (str1[i] === str2[i + shift]) {
    return {
      type: "insert",
      offset: i + shift - 1
    };
  } else if (str1[i + shift] === str2[i]) {
    return {
      type: "drop",
      offset: i
    };
  }

  return shiftCompare(str1, str2, i, shift + 1);
};

export default shiftCompare;
