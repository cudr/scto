export type Collate = string[] | string;

export interface Replace {
  type: "replace";
  offset: number;
  shift: number;
  data: Collate;
}

export interface Insert {
  type: "insert";
  offset: number;
  shift?: any;
  data: Collate;
}

export interface Drop {
  type: "drop";
  offset: number;
  shift: number;
  data?: any;
}

export type Operation = Replace | Insert | Drop;
