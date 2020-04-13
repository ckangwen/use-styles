import defaultGenerateId from './utils/generateId';
import escape from './utils/escape';
import toCss from './utils/toCss';
import { RuleBodyDeclaration, CssBodyDeclaration, CSSPropertiesKeys } from '../interface/core';
import { StyleRuleOptions, ToCssOptions, RuleToStringOptions, updatePropOptions } from '../interface/options';
import DomRenderer from './DomRenderer'
import converseCase from './utils/converseCase'
import operateFn from './utils/operateFn'
import insertUnit from './utils/insertUnit'


export default class StyleRule {
  /** rule名 */
  ruleName: string

  isProcessed: boolean = false

  style: CssBodyDeclaration

  renderer: DomRenderer

  cssStyleRule: any

  options: StyleRuleOptions

  className: string

  selectorText: string

  constructor(ruleName: string, style: RuleBodyDeclaration, options: StyleRuleOptions) {
    const { sheet, generateId, renderer } = options
    this.ruleName = ruleName
    this.style = insertUnit(converseCase(operateFn(style, this)))
    this.options = options
    this.className =  generateId ? generateId() : defaultGenerateId(this, sheet)
    // this.className =  generateId && generateId() || defaultGenerateId(this, sheet)
    this.renderer = renderer
    this.selectorText = `.${escape(this.className)}`
  }

  /**
   * 读取或设置style
   * @param{string} key: 动态style的属性名
   * @param{object} value: 动态style的属性值
   */

  prop(key: CSSPropertiesKeys, value: string, options: updatePropOptions): string | number | null | void {
    // 如果只传入key，则表示获取该key的值
    if (value == null) return this.style[key]

    const { force = false } = options
    // key的值没有变化
    if (!force && this.style[key] === value) return null

    const newValue = value

    const isEmpty = newValue == null
    const isDefined = key in this.style
    // 如果值为空，则移除
    const remove = isEmpty && isDefined

    // 值为空，并且是新添加的key
    if (isEmpty && !isDefined && !force) return null

    // 更新或移除
    if (remove) {
      delete this.style[key]
    } else {
      this.style[key] = newValue
    }

    if (this.cssStyleRule && this.renderer) {
      if (remove) {
        // this.renderer.removeProperty(this.renderable, name)
      }
      else {
        this.renderer.setProperty(this.cssStyleRule, key, newValue)
      }
    }

    return null
  }

  toString(options?: RuleToStringOptions): string {
    const { sheet } = this.options
    const link = sheet ? sheet.options.link : false
    const opts: ToCssOptions = link ? {...options, allowEmpty: true} : options
    return toCss(this.selectorText, this.style, opts)
  }
}
