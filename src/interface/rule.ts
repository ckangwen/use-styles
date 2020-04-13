import StyleSheet from '../core/StyleSheet'
import StyleRule from '../core/StyleRule';

export type GenerateId = (rule: StyleRule, sheet?: StyleSheet) => string

export type Classes = {
  [x: string]: string
}

export interface RuleOptions {
  selector?: string
  sheet: StyleSheet
  index: number
  classes?: Classes
  jss: any
}

export interface BaseRule {
  type: string
  /**
   * Key is used as part of a class name.
   * It has to be a valid CSS identifier
   * https://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
   */
  key: string
  isProcessed: boolean
  options: RuleOptions
  renderable?: Object | null | void
  cssText?: string
  toString?: (options?: any) => string
}
export type Rule = StyleRule & BaseRule
