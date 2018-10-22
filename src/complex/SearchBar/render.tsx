import * as React from 'react'
import { Button, Form, message, Input, Select, Col, DatePicker } from 'antd'
const FormItem = Form.Item
const Option = Select.Option
const { RangePicker } = DatePicker
const formItemLayout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }

function noop() { }

const generateItem = (field: any, form) => {
  let item = null

  const CUSTOM_FIELDS = {
    // select
    select: (
      <Select style={{ width: 120 }}>
        {
          field.items && field.items.map(item => (
            <Option key={item.value} value={item.value}>{item.mean}</Option>
          ))
        }
      </Select>
    ),
    // DatePicker
    datePicker: (<DatePicker />),
    // RangePicker
    rangePicker: (<RangePicker />),
  }

  // 为 item 匹配符合 type 的组件类型
  item = CUSTOM_FIELDS[field.type] || (
    <Input />
  )

  // 设置通用绑定的方法或属性
  const componentProps = field.componentProps || {}
  const ModifyProps = props => ({
    onChange: e => {
      if (field.onChange) return field.onChange(form)
      return noop()
    },

    style: field.style || props.style,
    disabled: field.disabled,
    ...componentProps
  })
  const FinalItem = React.cloneElement(item, ModifyProps(item.props))

  const rules = field.rules && field.rules.length ? field.rules : []

  return (
    <FormItem {...formItemLayout} label={field.title} key={field.key}>
      {form.getFieldDecorator(field.key, {
        initialValue: field.initialValue || undefined,
        rules
      })(FinalItem)}
    </FormItem>
  )
}

export default generateItem
