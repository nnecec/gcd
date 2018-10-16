

import * as React from 'react'
import { Button, Form, message, Input, Row } from 'antd'
import generateItem from './render'

const FormItem = Form.Item



interface SearchBarProps {
  /** 表单标题 */
  fields: Field[],
}

interface Field {
  type: string,
  key: string,
  title: string,
  items?: () => void | object[],
}

class SearchBar extends React.Component<SearchBarProps, any> {
  private static defaultProps = {
    title: 'demo'
  }
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
    const { form, onSearch } = this.props
    e.preventDefault()

    form.validateFields((err, values) => {
      if (!err) {
        onSearch(values)
      }
    })
  }


  // 重置
  public handleReset = () => { }

  public render() {
    const { fields, form } = this.props

    return (<Form onSubmit={this.handleSearch}>

      <Row gutter={4}>
        {this.renderItems(fields)}
      </Row>

      <Button onClick={this.handleReset} >重置</Button>
      <Button type="primary" icon="search" htmlType="submit">搜索</Button>
    </Form>)
  }

}

export default Form.create()(SearchBar)
