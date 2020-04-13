import * as CSS from 'csstype'
import StyleSheet from '../core/StyleSheet'

export type Classes = {
  [x: string]: string
}

export type CSSPropertiesKeys = keyof CSS.Properties

export type CssBodyDeclaration = {
  [x in CSSPropertiesKeys]?: string | number
}

export type RuleBodyDeclaration = {
  [x in CSSPropertiesKeys]?: string | ((...args: any) => number | string)
}

export type RulesDefinition = {
  [x: string]: RuleBodyDeclaration
}
