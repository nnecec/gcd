import * as React from 'react'
import { shallow } from 'enzyme'


test('basic math.', () => {
  expect(1 + 1).toBe(2)
})

test('Jest-React-TypeScript 尝试运行', () => {
  const renderer = shallow(<div>hello world</div>)
  expect(renderer.text()).toEqual('hello world')
})
