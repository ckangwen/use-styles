import { useMemo, useEffect } from 'react'
import { RulesDefinition } from './interface/core';
import { InitialOptions } from './interface/options';
import { addDynamicRules, updateDynamicRules } from './utils/dynamicStyles'
import generateStyleSheet from './utils/generateStyleSheet'
import sheetManager from './utils/SheetManager'
import getSheetClasses from './utils/getSheetClasses';

export default function createUseStyle(rules: RulesDefinition, options: InitialOptions) {
  return function useStyles(data?): {
    [x: string]: string
  } {
    const [sheet, dynamicStyles] = useMemo(() => {
      const _sheet = generateStyleSheet({
        ...options,
        rules,
      })

      const _dynamicRules = _sheet ? addDynamicRules(_sheet, data) : null

      if (_sheet) {
        sheetManager.attach(options.key)
      }
      return [_sheet, _dynamicRules]
    }, [data])


    useEffect(() => {
      if (sheet && dynamicStyles) {
        updateDynamicRules(sheet, dynamicStyles, data)
      }
    }, [data, sheet, dynamicStyles])

    const classes = sheet && dynamicStyles ? getSheetClasses(sheet, dynamicStyles) : {}

    return classes
  }
}
