import * as execa from 'execa';
import clean from './clean';


(async () => {
  console.log('build start')

  await clean()
  await execa('yarn', ['build:umd'], { stdout: 'inherit' })
  await execa('yarn', ['build:es'], { stdout: 'inherit' })
  await execa('yarn', ['build:es.css'], { stdout: 'inherit' })

  console.log('build end')
})().catch(err => {
  console.log(err)
  err.stderr && console.error(err.stderr)
  err.stdout && console.error(err.stdout)
  process.exit(1)
})