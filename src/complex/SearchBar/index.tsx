import * as React from 'react'
import { Button, Form, message, Input, Row, Col } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { debounce } from 'lodash'

import { SearchBarProps } from './iSearchBar'
import generateItem from './render'

/**
 * 搜索条
 * 内部支持 form 方法与校验
 * 支持多种组件及自定义组件
 *
 * @class SearchBar
 * @extends {(React.Component<SearchBarProps & FormComponentProps, any>)}
 * @author nnecec<nnecec@outlook.com>
 * 
 */
@Form.create()
export default class SearchBar extends React.Component<SearchBarProps & FormComponentProps, any> {
  public state: {

  }
  public props: SearchBarProps & FormComponentProps

  constructor(props) {
    super(props)
  }

  // 渲染各种搜索条件
  public renderItems = (fields = []) => {
    const { form } = this.props

    const fieldsFormed = fields.map(field => {
      return generateItem(field, form)
    })

    return fieldsFormed
  }

  // TODO: debounce
  // 查询
  public handleSearch = (e) => {
    e.preventDefault()

    const { form, onSearch } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        onSearch(values)
      }
    })
    return false
  }


  // 重置
  public handleReset = () => {
    const { form } = this.props
    form.resetFields()
  }

  public render() {
    const { fields, form } = this.props

    return (<Form onSubmit={this.handleSearch} layout="inline">
      <Row gutter={4}>
        {this.renderItems(fields)}
      </Row>

      <div>
        <Button onClick={this.handleReset} style={{ marginRight: 10 }}>重置</Button>
        <Button type="primary" icon="search" htmlType="submit">搜索</Button>
      </div>

    </Form>)
  }

}
