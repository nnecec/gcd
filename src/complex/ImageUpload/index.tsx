import * as React from 'react'
import { Upload, Modal, Icon, message } from 'antd'

interface Measure {
  width: number,
  height: number
}

interface ImageUploadProps {
  /** 上传图片的 api */
  action: string,
  /** 校验图片格式 支持 png|jpg */
  format?: 'png' | 'jpg',
  /** 校验图片大小 单位为 M */
  size?: number,
  /** 校验图片尺寸  */
  measure?: Measure,
  /** 接受上传图片数量  */
  length?: number,
}

function getBase64(img, callback): void {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

/**
 * ImageUpload.
 */
export default class ImageUpload extends React.Component<ImageUploadProps, any> {
  private static defaultProps = {
    length: Infinity
  }
  public props: ImageUploadProps;

  public state: {
    previewVisible: boolean; // 预览图片 Modal 的 Visible 属性
    previewImage: string; // 预览图片的 url
    fileList: any[];
  };

  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
    }
  }

  public render() {
    const { fileList, previewVisible, previewImage } = this.state
    const { action, length } = this.props
    return (
      <div className="clearfix" >
        <Upload
          listType="picture-card"
          action={action}
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          beforeUpload={this.handleBeforeUpload}
        >
          {
            fileList.length >= length ? null : <div>
              <Icon type="plus" />
            </div>
          }
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancelPreview}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>

    )
  }

  public componentDidMount() {
    console.log(this.props)
  }

  public componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  private setFileList = () => {

  }

  // 上传图片后的 change 调用
  private handleChange = ({ fileList }) => {
    this.setState({ fileList })
  }

  // 预览图片
  private handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  // 校验图片格式 / 大小 / 尺寸
  private handleBeforeUpload = (file) => new Promise((resolve, reject) => {
    getBase64(file, (url) => {
      const { measure, format, size } = this.props

      // 图片格式
      if (format) {
        const _format = {
          jpg: 'image/jpeg',
          png: 'image/png'
        }
        if (_format[format] !== file.type) {
          message.error(`请上传图片格式为${format}的图片`)
          reject()
        }

      }

      // 图片大小
      if (size) {
        const sizeLimit = file.size / 1024 / 1024 < size
        if (!sizeLimit) {
          message.error(`请上传图片大小为${size}M的图片`)
          reject()
        }
      }

      // 图片尺寸
      if (measure) {
        getBase64(file, (url) => {
          const img = document.createElement('img')
          document.body.insertAdjacentElement('beforeend', img)
          img.style.visibility = 'hidden'
          img.src = url

          img.onload = () => {
            const imgWidth = img.offsetWidth
            const imgHeight = img.offsetHeight

            if (measure.width && imgWidth !== measure.width) {
              message.error('图片宽度不正确')
              reject()
            }
            if (measure.height && imgHeight !== measure.height) {
              message.error('图片高度不正确')
              reject()
            }
            resolve()
          }
        })
      }
      resolve()
    })
  })


  // 关闭图片预览
  private handleCancelPreview = () => this.setState({ previewVisible: false })
}