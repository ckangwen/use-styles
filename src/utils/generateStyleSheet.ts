import { InternalStyleSheetOptions, GenerateStyleOptions } from '../interface/options';
import sheetManager from './SheetManager'
import { getDynamicStyles } from './dynamicStyles';
import StyleSheet from '../core/StyleSheet';
import { setStyleStore } from './styleStore'

function getSheetOptions(options: GenerateStyleOptions, link = false ): InternalStyleSheetOptions {
  return {
    ...options,
    link,
  }
}

export default function generateStyleSheet(options: GenerateStyleOptions): StyleSheet {

  const sheet = sheetManager.get(options.key)
  if (sheet) return sheet

  const { rules } = options
  const dynamicStyles = getDynamicStyles(rules)

  const newSheet = new StyleSheet(
    rules,
    getSheetOptions(options, dynamicStyles != null),
  )

  setStyleStore(newSheet, {
    rules,
    dynamicStyles,
  })

  sheetManager.set(options.key, newSheet)

  return newSheet
}
