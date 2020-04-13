import SheetStyle from '../core/StyleSheet'

type Meta = {
  rules: any,
  dynamicStyles: any
}
const map = new WeakMap<SheetStyle, Meta>()

export function getStyleStore(sheet: SheetStyle) {
  return map.get(sheet)
}
export function setStyleStore(sheet: SheetStyle, rules: Meta) {
  return map.set(sheet, rules)
}
