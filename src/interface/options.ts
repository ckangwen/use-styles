import { RulesDefinition } from './core';
import StyleSheet from '../core/StyleSheet';
import { Classes } from './rule';
import DomRenderer from '../core/DomRenderer';

export interface InitialOptions {
  generateId?: Function
  key: string
  classNamePrefix?: string
  meta?: string
}

export interface GenerateStyleOptions extends InitialOptions {
  rules: RulesDefinition
}

export interface InternalStyleSheetOptions extends GenerateStyleOptions {
  link?: boolean
}

export interface StyleSheetOptions extends InternalStyleSheetOptions {
  sheet: StyleSheet
  classes: Classes
  renderer: DomRenderer
}

export interface StyleRuleOptions extends StyleSheetOptions {
}

export interface ToCssOptions {
  indent?: number
  allowEmpty?: boolean
  children?: boolean
}

export type updatePropOptions = {
  force?: boolean
  process?: boolean
}

export interface RuleToStringOptions {
  indent?: number
  allowEmpty?: boolean
  children?: boolean
}