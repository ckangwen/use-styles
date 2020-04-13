// import defaultUnit from './default-unit'
import { CssBodyDeclaration } from '../../interface/core';

const defaultUnit = require('./default-unit')
/**
 * Recursive deep style passing function
 */
function iterate(prop: string, value: string | number) {
  if (!value) return value

  if (typeof value === 'number') {
    if (defaultUnit[prop]) return `${value}${defaultUnit[prop]}`

    return value.toString()
  }

  return value
}

export default function insertUnit(style: CssBodyDeclaration): CssBodyDeclaration {
  Object.keys(style).forEach(key => {
    style[key] = iterate(key, style[key])
  })
  return style
}
