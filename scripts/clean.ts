import * as fse from 'fs-extra'
import * as path from 'path'

export default async function clean() {
  await fse.remove(path.resolve(__dirname, '../dist'))
  await fse.remove(path.resolve(__dirname, '../es'))
}