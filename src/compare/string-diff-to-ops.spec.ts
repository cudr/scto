import { stringDiffToOps } from './string-diff-to-operations'
import { applyOps } from '../operations'
import {
  origin,
  modifyed,
  origin_lorem,
  modifyed_lorem,
} from '../../text-source'

describe('string diff to operations', () => {
  it('string diff equals hamlet', () => {
    expect(applyOps(origin, stringDiffToOps(origin, modifyed))).toBe(modifyed)
  })

  it('string diff equals lorem', () => {
    expect(
      applyOps(origin_lorem, stringDiffToOps(origin_lorem, modifyed_lorem))
    ).toBe(modifyed_lorem)
  })
})
