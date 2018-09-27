import * as React from 'react'
import { Upload, Modal, Icon, message } from 'antd'

interface SearchBarProps {
  /** 表单标题 */
  title: string,
}

export default class SearchBar extends React.Component<SearchBarProps, any> {
  private static defaultProps = {
    title: 'demo'
  }
  public state: {
    
  };
  public props: SearchBarProps;

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  public render() {
    return (<div>searchBar</div>)
  }

}