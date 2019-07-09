import collateDiffToOps from "./collateDiffToOps";

const listOpToStringOp = op => {};

const stringDiffToOps = (origin: string, modifyed: string) => {
  const originList: string[] = origin.split(" ");
  const modifyedList: string[] = modifyed.split(" ");

  const operations = collateDiffToOps(originList, modifyedList);

  console.log("operations", operations);

  return operations.reduce((acc, op) => {}, []);
};

export default stringDiffToOps;
