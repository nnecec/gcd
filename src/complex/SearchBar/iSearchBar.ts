export interface SearchBarProps {
  /** 搜索框选项 */
  fields: Field[],
  /** 搜索调用方法 */
  onSearch: (values) => void,
}

interface Field {
  /** 子项类型 */
  type: string,
  /** 子项 key */
  key: string,
  /** 子项 label 名 */
  title: string,
  /** 子项 默认值 */
  initialValue?: string | number,
  /** Select 组件等子项 */
  items?: () => void | object[],
  /** 子项校验，与 Form 的 rules 类似 */
  rules?: object[],
  /** 子项 onChange 回调 */
  onChange?: () => void,
}