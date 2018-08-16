import React from 'react'
import { Form, Input, Select } from 'antd'

const Option = Select.Option

// 表单配置 antd 组件 配置
interface ItemTypeConfig {
  name: string, // 组件类型
  configs: object, // 组件 options
  options: any[], // select option 选项
}
// 表单子项 配置
interface FormItemConfig {
  key: string,
  initialValue: any,
  type: ItemTypeConfig
}
interface FormMapProps {
  items: FormItemConfig[]
}
export default class FormMap extends React.Component<FormMapProps, any> {
  private state: {
    previewVisible: boolean // 预览图片 Modal 的 Visible 属性
    previewImage: string // 预览图片的 url
    fileList: any[]
  }
  private props: FormMapProps

  public render() {
    return (
      <React.Fragment>
        {this.renderForm()}
      </React.Fragment>
    )
  }

  private renderItem = item => {
    const { form } = this.props
    const { getFieldDecorator } = form
    const { key, initialValue, formItemConfigs } = item

    const ITEM_CONFIG = {
      label: key,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      ...formItemConfigs
    }

    return (
      <Form.Item
        {...ITEM_CONFIG}
      >
        {
          getFieldDecorator(key, {
            initialValue: initialValue || undefined,
          })(
            getItemByType(item)
          )}
      </Form.Item>
    )
  }

  private renderForm = () => {
    const { items } = this.props
    return items.map(item => {
      return (
        <React.Fragment key={item.key}>
          {this.renderItem(item)}
        </React.Fragment>
      )
    })
  }
}

// 针对不同的
function getItemByType(type: ItemTypeConfig) {
  let FieldItem

  const CONFIGS = {
    ...type.configs
  }

  switch (type.name) {
    case 'Input':
      FieldItem = <Input  {...CONFIGS} />
      break
    case 'Select':
      FieldItem = <Select style={{ width: '200px' }} {...CONFIGS} >
        {
          type.options.map(option => (
            <Option key={option.value} value={option.value}>{option.mean}</Option>
          ))
        }
      </Select >
      break
    default:
      FieldItem = <Input  {...CONFIGS} />
  }

  return FieldItem
}