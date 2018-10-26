import * as React from 'react'
import { shallow, mount } from 'enzyme'
import SearchBar from '..'

describe('SearchBar', () => {


  test('could submit search', () => {
    const onSearch = jest.fn()
    const wrapper = mount(
      <SearchBar
        onSearch={onSearch}
        fields={[{ key: 'name', title: '名称' }]}
      />
    )

    wrapper.find('button[type="submit"]').simulate('click')
    expect(onSearch).toBeCalled()
  })
})