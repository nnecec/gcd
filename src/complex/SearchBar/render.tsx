import * as React from 'react'
import { Button, Form, message, Input, Select, Col } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

const formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }

function noop() { }

const generateItem = (field: any, form) => {
  let item = null

  const CUSTOM_FIELDS = {
    // select
    select: (
      <Select>
        {
          field.items && field.items.map(item => (
            <Option key={item.value} value={item.value}>{item.mean}</Option>
          ))
        }
      </Select>
    ),
    //
  }

  // 为 item 匹配符合 type 的组件类型
  item = CUSTOM_FIELDS[field.type] || (
    <Input onChange={e => {
      if (field.onChange) return field.onChange(form)
      return noop()
    }} />
  )

  let rules = []

  if (field.rules) {
    rules = field.rules
  }

  return (
    <Col span={6}>
      <FormItem {...formItemLayout} label={field.title} key={field.key}>
        {form.getFieldDecorator(field.key, {
          initialValue: field.initialValue || undefined,
          rules
        })(item)}
      </FormItem>
    </Col>)
}

export default generateItem
