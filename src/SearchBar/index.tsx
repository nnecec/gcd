import * as React from 'react'
import { Upload, Modal, Icon, message } from 'antd'

interface SearchBarProps {
  /** 表单标题 */
  title: string,
}

export default class SearchBar extends React.Component<SearchBarProps, any> {
  private static defaultProps = {
    length: Infinity
  }
  private state: {
    previewVisible: boolean; // 预览图片 Modal 的 Visible 属性
    previewImage: string; // 预览图片的 url
    fileList: any[];
  };
  private props: SearchBarProps;

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  public render() {
    return (<div>searchBar</div>)
  }

}