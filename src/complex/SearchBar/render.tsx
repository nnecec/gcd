import * as React from 'react'
import { Button, Form, message, Input, Select, Col } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

const formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }

function noop() { }

const generateItem = (field, form) => {
  let item = null
  switch (field.type) {
    case 'select':
      item = (
        <Select>
          {
            field.items.map(item => (
              <Option key={item.value} value={item.value}>{item.mean}</Option>
            ))
          }
        </Select>
      )
      break;

    default:
      item = (
        <Input onChange={e => {
          if (field.onChange) return field.onChange(form)
          return noop()
        }} />
      )
      break;
  }

  let rules = []

  if (field.rules) {
    rules = field.rules
  }

  return (
    <Col span={6}>
      <FormItem {...formItemLayout} label={field.title} key={field.key}>
        {form.getFieldDecorator(field.key, {
          rules
        })(item)}
      </FormItem>
    </Col>)
}

export default generateItem
