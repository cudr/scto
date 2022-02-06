import { diffWordsWithSpace } from 'diff'
import { diff_match_patch } from 'diff-match-patch'
import { stringDiffToOps } from '../src/compare/string-diff-to-operations'
import { applyOps } from '../src/operations'
import { genSentences, randomizeText } from './benchmark-utils'

describe('benchmark diff compare', () => {
  const origin = genSentences(50)
  const modifyed = randomizeText(origin)

  let dmp: any = new diff_match_patch()

  console.time('csto stringDiffToOps')
  const operations = stringDiffToOps(origin, modifyed)
  console.timeEnd('csto stringDiffToOps')

  console.time('jsdiff diffWordsWithSpace')
  const diff = diffWordsWithSpace(origin, modifyed)
  console.timeEnd('jsdiff diffWordsWithSpace')

  console.time('diff-match-patch patch_make')
  const dmp_patch = dmp.patch_make(origin, modifyed)
  console.timeEnd('diff-match-patch patch_make')

  it('string scto equals', () => {
    expect(applyOps(origin, operations)).toBe(modifyed)
  })

  it('string jsdiff equals', () => {
    const result = diff.reduce(
      (acc: any, el) => (el.removed ? acc : acc + el.value),
      ''
    )

    expect(result).toBe(modifyed)
  })

  it('string diff-match-patch equals', () => {
    expect(dmp.patch_apply(dmp_patch, origin)[0]).toBe(modifyed)
  })
})
