import warning from 'tiny-warning'
import StyleRule from './StyleRule';
import { CSSPropertiesKeys } from '../interface/core';
import StyleSheet from './StyleSheet';
import StyleRuleList from './StyleRuleList';
/**
 * 缓存函数调用的值
 */
function memoize<T>(fn) {
  let value = null
  return () => {
    if (!value) value = fn()
    return value as T
  }
}

function getPropertyValue(cssRule, prop) {
  try {
    // Support CSSTOM.
    if (cssRule.attributeStyleMap) {
      return cssRule.attributeStyleMap.get(prop)
    }
    return cssRule.style.getPropertyValue(prop)
  } catch (err) {
    // IE may throw if property is unknown.
    return ''
  }
}

function setProperty({ style }: CSSStyleRule, prop: CSSPropertiesKeys, value: string) {
  try {
    style.setProperty(prop, value)
  } catch (err) {
    return false
  }
  return true
}

function removeProperty({ style }: CSSStyleRule, prop: CSSPropertiesKeys) {
  try {
    style.removeProperty(prop)
  } catch (err) {
    warning(
      false,
      `[JSS] DOMException "${err.message}" was thrown. Tried to remove property "${prop}".`,
    )
  }
}

const getHead = memoize<HTMLHeadElement>(() => {
  return document.querySelector('head')
})

function createStyle(): HTMLStyleElement {
  const el = document.createElement('style')
  el.textContent = '\n'
  return el
}

function insertStyle(style: HTMLStyleElement) {
  getHead().appendChild(style)
}

function insertRule(container: CSSStyleSheet, rule: string, index: number = container.cssRules.length) {
  try {
    container.insertRule(rule, index)
    return container.cssRules[index] as CSSStyleRule
  } catch(err) {
    return false
  }
}

export default class DomRenderer {
  getPropertyValue = getPropertyValue

  setProperty = setProperty

  removeProperty = removeProperty

  element: HTMLStyleElement = createStyle()

  sheet: StyleSheet = null

  hasInsertedRules = false

  constructor(sheet: StyleSheet) {
    this.sheet = sheet
    this.element.setAttribute('type', 'text/css')
    this.element.setAttribute('data-jss', '')
  }

  attach() {
    if (!this.sheet) return

    insertStyle(this.element)
    if (this.hasInsertedRules) {
      this.hasInsertedRules = false
      this.deploy()
    }
  }

  deploy() {
    const { sheet } = this
    if (!sheet) return

    if (sheet.options.link) {
      this.insertRules(sheet.rules)
      return
    }
    this.element.textContent = `\n${sheet.toString()}\n`
  }

  insertRules(rules: StyleRuleList, nativeParent?: CSSStyleSheet) {
    rules.collection.forEach((rule, index) => {
      this.insertRule(rule, index, nativeParent)
    })
  }

  insertRule(rule: StyleRule, index, nativeParent: CSSStyleSheet = (this.element.sheet as CSSStyleSheet)) {
    const ruleStr = rule.toString()

    if (!ruleStr) return false

    const nativeRule = insertRule(nativeParent, ruleStr, index)
    if (nativeRule === false) {
      return false
    }
    this.hasInsertedRules = true
    rule.cssStyleRule = nativeRule
    return nativeRule
  }
}