import { getDynamicStyles } from '../dynamicStyles'

describe('测试Group', () => {
  it('测验getDynamicStyles', () => {
    const styles1 = {
      color: 'red',
    }
    const styles2 = {
      color: ({ color }) => color,
    }
    const styles3 = {
      color: 'red',
      border: ({ color }) => color,
    }

    // expect(getDynamicStyles(styles1)).toEqual(null)
    expect(getDynamicStyles(styles2)).toEqual({
      color: ({ color }) => color,
    })
  });
})
