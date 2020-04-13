import SheetStyle from '../core/StyleSheet'

export class SheetManager {
  map = new Map<any, SheetStyle>()

  length = 0

  get size() {
    return this.length
  }

  set(key: any, sheet: SheetStyle): void {
    if (this.map.has(key)) return
    this.length ++

    this.map.set(key, sheet)
  }

  get(key): SheetStyle {
    return this.map.get(key)
  }

  attach(key): SheetStyle | null {
    const sheet = this.map.get(key)
    if (sheet) {
      sheet.attach()

      return sheet
    }

    return null
  }
}

export default new SheetManager()