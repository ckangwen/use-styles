/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
import { Classes } from '../interface/rule';
import cloneStyle from './utils/cloneStyle'
import StyleRule from './StyleRule'
import { StyleSheetOptions, StyleRuleOptions, RuleToStringOptions, updatePropOptions } from '../interface/options';
import { RuleBodyDeclaration, CSSPropertiesKeys } from '../interface/core';
import { fnRuleNamespace, fnValueNamespace } from './utils/fnValueNamespace';

const defaultUpdateOptions = {
  process: true,
}

export default class StyleRuleList {
  map: {
    [x: string]: RuleBodyDeclaration
  } = {}

  collection: StyleRule[] = []

  options: StyleSheetOptions

  classes: Classes

  cssText: string

  constructor(options: StyleSheetOptions) {
    this.options = options
    this.classes = options.classes
  }

  add(key: string, decl: RuleBodyDeclaration, ruleOptions?: StyleRuleOptions): StyleRule {
    const newDecl = cloneStyle(decl)
    let name = key
    if (name in this.map) {
      name = `${key}-${new Date().getSeconds()}`
    }
    this.map[name] = newDecl

    let rule
    if (typeof decl !== 'function') {
      rule = new StyleRule(name, decl, this.options)
    } else {
      rule = new StyleRule(name, {}, this.options)
      rule[fnRuleNamespace] = decl
    }

    if (!rule) return null

    this.register(rule)
    return rule

  }

  /**
   * 添加新的rule之后需要將新的rule存入集合中,
   * 并更新`classes`
   */
  register(rule: StyleRule) {
    this.collection.push(rule)
    if (rule.className) {
      this.classes[rule.ruleName] = rule.className
    }
  }

  update(rule: StyleRule, data: any, updateOptions?: updatePropOptions) {
    if (rule) {
      this.onUpdate(rule, data, updateOptions)
    } else {
      this.collection.forEach(item => {
        this.onUpdate(item, data, updateOptions)
      })
    }
  }

  onUpdate(rule: StyleRule, data: any, options: updatePropOptions = defaultUpdateOptions): void {
    const ruleCopy: StyleRule = Object.assign(rule)
    const {style} = ruleCopy
    const fnRule = ruleCopy[fnRuleNamespace]
    if (fnRule) {
      // 执行该更新函数
      ruleCopy.style = fnRule(data) || {}
    }

    const fnValues = ruleCopy[fnValueNamespace]

    if (fnValues) {
      Object.keys(fnValues).forEach((_prop: CSSPropertiesKeys) => {
        ruleCopy.prop(_prop, fnValues[_prop](data), options);
      })
    }

    if (options.process && style && style !== ruleCopy.style) {
      // TODO
      // operateFn((style as RuleBodyDeclaration), rule)
    }
  }

  toString(options?: RuleToStringOptions) {
    return this.collection.map(rule => {
      return rule.toString(options)
    }).join('\n')
  }

}