import * as React from 'react'
import { Button, Upload, Modal, Icon, message } from 'antd'

interface Measure {
  width: number,
  height: number
}

interface ImageUploadProps {
  action: string,
  format?: string,
  size?: number,
  measure?: Measure,
  length?: number,

}

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export default class ImageUpload extends React.Component<ImageUploadProps, any> {
  static defaultProps = {
    length: Infinity
  }

  constructor(props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
    }
  }

  handleChange = ({ fileList }) => {
    console.log(fileList)
    this.setState({ fileList })
  }

  // 预览图片
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  // 校验图片格式 / 大小 / 尺寸
  handleBeforeUpload = (file) => new Promise((resolve, reject) => {
    getBase64(file, (url) => {
      const { measure, format, size } = this.props

      const _format = {
        jpg: 'image/jpeg',
        png: 'image/png'
      }
      console.log(file.type)
      // 图片格式
      if (format && _format[format] !== file.type) {
        message.error(`请上传图片格式为${format}的图片`)
        reject()
      }

      // 图片大小
      const sizeLimit = file.size / 1024 / 1024 < size
      if (size && !sizeLimit) {
        message.error(`请上传图片大小为${size}M的图片`)
        reject()
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



  handleCancelPreview = () => this.setState({ previewVisible: false })

  render() {
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
}