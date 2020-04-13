import { RuleBodyDeclaration } from '../../interface/core';

export default function cloneStyle(style: RuleBodyDeclaration): RuleBodyDeclaration {
  if (style === null || typeof style !== 'object') return style

  const newStyle = {}
  Object.keys(style).forEach(key => {
    newStyle[key] = cloneStyle(style[key])
  })
  return newStyle
}
