/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
const SEED = 5381

function phash(h: number, x: string) {
  let i = x.length
  while (i) {
    h = (h * 33) ^ x.charCodeAt(--i)
  }
  return h
}

export default function hash(x: string) {
  return phash(SEED, x)
}
