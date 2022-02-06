import faker from 'faker'
import { insert, drop } from '../src/utils'

export const genSentences = (iterations: number = 100): string => {
  let text = '',
    i = 0

  for (i; i < iterations; i++) {
    text += faker.lorem.sentences()
  }

  return text
}

let simbols =
  '!@#$%^&*()_+~`|  }{[]:;?><,./-=0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

export const getRandSimbol = (): string => {
  return simbols[Math.floor(Math.random() * simbols.length)]
}

export const randomizeString = (source: string) => {
  const rand = Math.random()

  if (rand < 0.6) return source

  const index = Math.floor(Math.random() * source.length)

  if (rand > 0.8) return insert(source, getRandSimbol(), index) as string

  return drop(source, index, 1) as string
}

export const randomizeText = (text: string = ''): string => {
  const arr = text.split(' ')

  const randomArr = arr.reduce((acc: string[], el: string) => {
    const rand = Math.random()

    if (rand < 0.3) return acc
    if (rand > 0.7) return [...acc, faker.random.words()]

    return [...acc, randomizeString(el)]
  }, [])

  return randomArr.join(' ')
}
