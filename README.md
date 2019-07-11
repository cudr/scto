# scto
Strings compare to OP (CRDT Operation model)

### Install

```bash
yarn install scto
```

### Example

```js
import { stringDiffToOps } from 'scto'

const origin = 'Yet so far hath discretion fought'
const modifyed = 'Yet get far discretion fought!'

const operations = stringDiffToOps(origin, modifyed)
```
