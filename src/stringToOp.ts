import shiftCompare from "./shiftCompare";
import { drop, insert } from "./utils";

const stringToOp = (str1, str2) => {
  const maxLen = Math.max(str1.length, str2.length),
    operations = [];

  let i = 0;

  for (i; i < maxLen; i++) {
    let operation = str1[i] !== str2[i] && shiftCompare(str1, str2, i);
    console.log("operation", operation);
    if (operation) {
      const { type, offset } = operation;
      while (i < offset) {
        operations.push({
          type,
          offset: i
        });

        if (type === "insert") {
          str1 = insert(str1, str2[i], i);
        } else if (type === "drop") {
          str1 = drop(str1, i);
        }

        i++;
      }
    }
  }

  return operations;
};

export default stringToOp;
