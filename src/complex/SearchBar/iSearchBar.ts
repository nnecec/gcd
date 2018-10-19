export interface SearchBarProps {
  /** 搜索框选项 */
  fields: Field[],
}

interface Field {
  type: string,
  key: string,
  title: string,
  items?: () => void | object[],
}