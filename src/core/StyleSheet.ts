import StyleRuleList from './StyleRuleList';
import { StyleSheetOptions, InternalStyleSheetOptions } from '../interface/options';
import { RulesDefinition, RuleBodyDeclaration, Classes } from '../interface/core';
import DomRenderer from './DomRenderer';
import StyleRule from './StyleRule';

export default class StyleSheet {
  options: StyleSheetOptions

  deployed: boolean

  attached: boolean

  rules: StyleRuleList

  renderer: DomRenderer

  classes: Classes

  // queue: StyleRuleListOptions[]

  constructor(rules: RulesDefinition, options: InternalStyleSheetOptions) {
    this.attached = false
    this.deployed = false
    this.renderer = new DomRenderer(this)
    this.classes = {}
    this.options = {
      ...options,
      renderer: this.renderer,
      sheet: this,
      classes: this.classes,
    }

    this.rules = new StyleRuleList(this.options)

    Object.keys(rules).forEach(key => {
      this.rules.add(key, rules[key])
    })
  }

  attach() {
    if (!this.renderer) return this
    if (this.attached || !this.renderer) return this
    this.renderer.attach()
    this.attached = true
    if (!this.deployed) this.deploy()
    return this
  }

  deploy() {
    if (this.renderer) {
      this.renderer.deploy()
      this.deployed = true
    }
    return this
  }

  addRule(ruleName: string, decl: RuleBodyDeclaration, options?) {
    const rule = this.rules.add(ruleName, decl, options)

    if (!rule) return null

    if (this.attached) {
      if (!this.deployed) return rule
    }

    return null
  }

  update(rule: StyleRule, data: any) {
    this.rules.update(rule, data)
    return this
  }

  toString() {
    return this.rules.toString()
  }
}