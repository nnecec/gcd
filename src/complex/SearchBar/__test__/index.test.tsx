import * as React from 'react'
import { shallow, mount } from 'enzyme'
import SearchBar from '..'

describe('SearchBar', () => {
  test('SearchBar: could submit search', () => {
    const onSearch = jest.fn()
    const wrapper = mount(
      <SearchBar
        onSearch={onSearch}
        fields={[{ key: 'name', title: '名称' }]}
      />
    )
    wrapper.find('input').simulate('change', { target: { value: 'shicheng' } });
    wrapper.find('[type="submit"]').simulate('submit')
    expect(onSearch).toHaveBeenCalledWith({ name: 'shicheng' })
  })

})

