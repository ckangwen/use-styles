import { CssBodyDeclaration } from '../../interface/core';

const uppercasePattern = /[A-Z]/g
const msPattern = /^ms-/
const cache = {}

function toHyphenLower(match) {
  return `-${match.toLowerCase()}`
}

function hyphenateStyleName(name) {
  // eslint-disable-next-line no-prototype-builtins
  if (cache.hasOwnProperty(name)) {
    return cache[name]
  }

  const hName = name.replace(uppercasePattern, toHyphenLower)
  cache[name] = msPattern.test(hName) ? `-${hName}` : hName
  return cache[name]
}

export default function convertCase(style: CssBodyDeclaration): CssBodyDeclaration {
  const converted = {}

  Object.keys(style).forEach(prop => {
    const key = prop.startsWith('--') ? prop : hyphenateStyleName(prop)

    converted[key] = style[prop]
  })

  return converted
}