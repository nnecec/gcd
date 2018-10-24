export interface SearchBarProps {
  /** 搜索框选项 */
  fields: Field[],
  /** 搜索调用方法 */
  onSearch: (values) => void,
}

export interface Field {
  /** 类型 */
  type: string,
  /** key */
  key: string,
  /** label 名 */
  title: string,
  /** 默认值 */
  initialValue?: string | number,
  /** Select 等组件子选项 */
  items?: any[]
  /** 校验项，与 Form 的 rules 类似 */
  rules?: object[],
  /** onChange 回调 */
  onChange?: (form?) => void,
  /** 组件的不常用API */
  componentProps: any,
  /** 是否禁用 */
  disabled: boolean,
  /** 样式 */
  style: any
}