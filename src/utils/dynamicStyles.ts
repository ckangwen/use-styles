import {  RulesDefinition, RuleBodyDeclaration } from '../interface/core';
import StyleSheet from '../core/StyleSheet';
import { getStyleStore } from './styleStore';
import StyleRule from '../core/StyleRule';

/**
 * 遍历JSSDefinition, RuleBodyDeclaration
 * 将value为function的键值对存入对象
 * 返回键值对集合
 */
export function getDynamicStyles(rules:  RulesDefinition | RuleBodyDeclaration ) {
  let to = null

  Object.keys(rules).forEach(key => {
    const value = rules[key]
    const type = typeof value

    if (type === 'function') {
      if (!to) to = {}

      to[key] = value
    }
    if (type === 'object' && value != null) {
      const extracted = getDynamicStyles(value)
      if (extracted) {
        if (!to) to = {}
        to[key] = extracted
      }
    }
  })

  return to
}

export function addDynamicRules(sheet: StyleSheet, data: any) {
  const styles = getStyleStore(sheet)

  if (!styles || !styles.dynamicStyles) return null

  const len = Object.keys(styles.rules).length;
  const { collection } = sheet.rules;
  const rules = {}

  Object.keys(styles.dynamicStyles).forEach(key => {
    sheet.addRule(key, styles.dynamicStyles[key])
    for(let i = len; i < sheet.rules.collection.length; i++) {
      sheet.update(collection[i], data)
      rules[collection[i].ruleName] = collection[i]
    }
    // sheet.rules.collection.forEach(rule => {
    //   sheet.update(rule, data)
    //   rules[rule.ruleName] = rule
    // })
  })
  return rules
}

export function updateDynamicRules(sheet: StyleSheet, dynamicRules, data) {
  Object.values(dynamicRules).forEach((rule: StyleRule) => {
    sheet.update(rule, data)
  })
}