import StyleSheet from '../core/StyleSheet';
import { getStyleStore } from './styleStore';

export default function getSheetClasses(sheet: StyleSheet, dynamicRules) {
  const classes = {}
  const styleStore = getStyleStore(sheet)

  if (!styleStore) return classes

  Object.keys(styleStore.rules).forEach(key => {
    classes[key] = sheet.classes[key]

    Object.values(dynamicRules).forEach((value: any) => {
      classes[key] += ` ${value.className}`
    })
  })
  return classes
}