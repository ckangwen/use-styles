import cloneStyle from "../cloneStyle"

describe('cloneStyle 测试', () => {
  it('传入null', () => {
    expect(cloneStyle(null)).toBe(null)
  })
  it('传入不可变参数', () => {
    const style = {
      color: 'red',
      border: '1px solid red',
    }
    expect(cloneStyle(style)).toEqual(style)
  })
  it('传入动态参数', () => {
    const style = {
      color: ({ color }) => color,
      border: '1px solid red',
    }
    expect(cloneStyle(style)).toEqual(style)
  })
})
