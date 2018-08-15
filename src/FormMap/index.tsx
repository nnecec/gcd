import React from 'react'
import { Form, Input, Select } from 'antd'

export default class FormMap extends React.Component {

  getItemByType = (item) => {
    const { type, configs } = item
    let FieldItem

    switch (type) {
      case 'Input':
        FieldItem = <Input  {...configs} />
        break
      case 'Select':
        FieldItem = <Select  {...configs} />
        break
      default:
        FieldItem = <Input  {...configs} />
    }

    return FieldItem
  }
  renderItem = item => {
    const { form } = this.props
    const { getFieldDecorator } = form
    const { name, initialValue, FormItemConfigs } = item

    return (
      <Form.Item
        {...FormItemConfigs}
      >
        {
          getFieldDecorator(name, {
            initialValue: initialValue || undefined,
          })(
            this.getItemByType(item)
          )}
      </Form.Item>
    )
  }

  renderForm = () => {
    const { items } = this.props
    return items.map(item => {
      return (
        <React.Fragment key={item.name}>
          {this.renderItem(item)}
        </React.Fragment>
      )
    })
  }

  render() {
    return (
      <React.Fragment>
        {this.renderForm()}
      </React.Fragment>
    )
  }
}




