import hash from './hash';
import StyleSheet from '../StyleSheet'
import StyleRule from '../StyleRule'

const AD_REPLACER_R = /(a)(d)/gi

// 字母上限
const charsLength = 52;

/* start at 75 for 'a' until 'z' (25) and then start at 65 for capitalised letters */
const getAlphabeticChar = (code) =>
  String.fromCharCode(code + (code > 25 ? 39 : 97));

/* input a number, usually a hash and convert it to base-52 */
function generateAlphabeticName(code) {
  let name = '';
  let x;

  /* get a char and divide by alphabet-length */
  for (x = Math.abs(code); x > charsLength; x = (x / charsLength) || 0) {
    name = getAlphabeticChar(x % charsLength) + name;
  }

  return (getAlphabeticChar(x % charsLength) + name).replace(AD_REPLACER_R, '$1-$2');
}

let ruleConter = 0

export default function generateId(rule: StyleRule, sheet?: StyleSheet): string {
  const env = process.env.NODE_ENV
  const defaultPrefix = env === 'production' ? 'c' : ''

  ruleConter += 1
  const prefix = sheet.options.classNamePrefix || defaultPrefix
  const name = prefix + rule.ruleName
  // eslint-disable-next-line no-bitwise
  return `${name}-${generateAlphabeticName((hash(name) >>> 0) + ruleConter)}`

}