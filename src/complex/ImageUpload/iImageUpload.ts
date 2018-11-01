interface Measure {
  width: number,
  height: number
}

export interface ImageUploadProps {
  /** 上传图片的 api */
  action: string,
  /** 校验图片格式 支持 png|jpg */
  format?: 'png' | 'jpg',
  /** 校验图片大小 单位为 M */
  size?: number,
  /** 校验图片尺寸  */
  measure?: Measure,
  /** 接受上传图片数量  */
  length?: number
}
