# scto
Text diff compare to OP (CRDT Operation model)

[![Build Status](https://travis-ci.org/cudr/scto.svg?branch=master)](https://travis-ci.org/cudr/scto)
<img src="https://img.shields.io/bundlephobia/minzip/scto.svg" />
![img](https://camo.githubusercontent.com/21132e0838961fbecb75077042aa9b15bc0bf6f9/68747470733a2f2f62616467656e2e6e65742f62616467652f4275696c74253230576974682f547970655363726970742f626c7565)

This package is similar to jsdiff, but generates CRDT-friendly operations. Useful for compare strings to OP data-transfer model. x30 faster then diff-match-patch and x625 faster for strings compare than jsdiff!

![image](https://user-images.githubusercontent.com/23132107/61914815-7f518380-af4a-11e9-91ee-d20ed80fe309.png)

### Install

```bash
yarn install scto
```

### Example

Text compare:
```js
import { stringDiffToOps, applyOps } from 'scto'

const origin = 'Yet so far hath discretion fought'
const modifyed = 'Yet get far discretion fought!'

const operations = stringDiffToOps(origin, modifyed)

/*
  operations [
    { type: 'replace', offset: 4, data: 'get', shift: 2 },
    { type: 'drop', offset: 12, shift: 5 },
    { type: 'insert', offset: 29, data: '!' }
  ] 
*/

const applyed = applyOps(origin, operations) // Yet get far discretion fought!

console.log(applyed === modifyed) // true
```

Array compare:
```js
import { collateDiffToOps, applyOps } from 'scto'

const origin = ['foo', 'bar', 'baz']
const modifyed = ['abc', 'foo', 'baz']

const operations = collateDiffToOps(origin, modifyed)

/*
  operations [
    { type: 'insert', offset: 0, data: ['abc'] },
    { type: 'drop', offset: 2, shift: 1 }
  ] 
*/

const applyed = applyOps(origin, operations)

/* ['abc', 'foo', 'baz'] */
```


### Possible operations:

Replace:
```
export interface Replace {
  type: "replace";
  offset: number;
  shift: number;
  data: Collate;
}
```

Drop:
```
export interface Drop {
  type: "drop";
  offset: number;
  shift: number;
  data?: any;
}
```

Insert:
```
export interface Insert {
  type: "insert";
  offset: number;
  shift?: any;
  data: Collate;
}
```
