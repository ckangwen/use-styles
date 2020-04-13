import toCssValue from './toCssValue'
import { ToCssOptions } from '../../interface/options'
import { CssBodyDeclaration } from '../../interface/core';

/**
 * Indent a string.
 * http://jsperf.com/array-join-vs-for
 */
function indentStr(str: string, indent: number): string {
  let result = ''
  for (let index = 0; index < indent; index++) result += '  '
  return result + str
}

/**
 * Converts a Rule to CSS string.
 */
export default function toCss(selector: string, style: CssBodyDeclaration, options: ToCssOptions = {}): string {
  let result = ''

  if (!style) return result

  let { indent = 0 } = options

  if (selector) indent++

  Object.keys(style).forEach(key => {
    const value = style[key]
    if (value !== null) {
      if (result) result += '\n'
      result += `${indentStr(`${key}: ${toCssValue(value)};`, indent)}`
    }
  })

  // Allow empty style in this case, because properties will be added dynamically.
  if (!result && !options.allowEmpty) return result

  // When rule is being stringified before selector was defined.
  if (!selector) return result

  indent--

  if (result) result = `\n${result}\n`

  return indentStr(`${selector} {${result}`, indent) + indentStr('}', indent)
}
