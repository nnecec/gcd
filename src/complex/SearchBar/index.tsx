import * as React from 'react'
import { Button, Form, message, Input, Row, Col } from 'antd'
import { debounce } from 'lodash'

import { SearchBarProps } from './iSearchBar'
import generateItem from './render'

const FormItem = Form.Item

class SearchBar extends React.Component<SearchBarProps, any> {
  public state: {

  }
  public props: SearchBarProps

  constructor(props) {
    super(props)
  }

  // 渲染各种搜索条件
  public renderItems = (fields) => {
    const { form } = this.props

    const fieldsFormed = fields.map(field => {
      return generateItem(field, form)
    })

    return fieldsFormed
  }

  // 查询
  public handleSearch = (e) => {
    e.preventDefault()


    const { form, onSearch } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        onSearch(values)
      }
    })


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

      <Col span={24} style={{ textAlign: 'right' }}>
        <Button onClick={this.handleReset} style={{ marginRight: 10 }}>重置</Button>
        <Button type="primary" icon="search" htmlType="submit">搜索</Button>
      </Col>

    </Form>)
  }

}

export default Form.create()(SearchBar)
