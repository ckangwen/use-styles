import { fnRuleNamespace, fnValueNamespace } from './fnValueNamespace'
import { RuleBodyDeclaration, CssBodyDeclaration } from '../../interface/core';
import StyleRule from '../StyleRule';
import cloneStyle from './cloneStyle';

export default function operateFn(decl: RuleBodyDeclaration, rule: StyleRule): CssBodyDeclaration {
  if (fnValueNamespace in rule || fnRuleNamespace in rule) return decl as CssBodyDeclaration

  const newDecl: RuleBodyDeclaration = cloneStyle(decl)

  const fnValues: {
    [x: string]: (...args: any) => string | number
  } = {}
  Object.keys(newDecl).forEach(key => {
    const value: string | ((...args: any) => string | number) = newDecl[key]
    if (typeof value === 'function') {
      delete newDecl[key]
      fnValues[key] = value
    }
  })
  rule[fnValueNamespace] = fnValues
  return newDecl as CssBodyDeclaration
}
