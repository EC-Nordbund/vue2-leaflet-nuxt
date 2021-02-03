const fs = require('fs')
const path = require('path')


const genCmp = name => `
import init from '../init.js'
import cmp from 'vue2-leaflet/dist/components/${name}.js'
import noop from '../noop.js'

if(process.client) { init() };

export default process.client ? cmp : noop`


if (!fs.existsSync('./src/components')) {
  fs.mkdirSync('./src/components')
}

fs.readdirSync('./src/components').forEach(file => {
  fs.unlinkSync('./src/components/' + file)
})

fs.readdirSync('./node_modules/vue2-leaflet/src/components').forEach(f => {
  const name = f.split('.')[0]
  fs.writeFileSync('./src/components/' + name + '.js', genCmp(name))
})

// Do css
const css = [require.resolve('leaflet/dist/leaflet.css'),
require.resolve('./gestureHandling/leaflet-gesture-handling.css')]

if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist')
}

const cssCode = css.map(v => fs.readFileSync(v, 'utf-8')).join('\n')
fs.writeFileSync('./dist/style.css', cssCode)

const base = path.join(path.dirname(require.resolve('leaflet')), '..', 'dist', 'images')
const t = path.join(__dirname, '..', 'dist', 'images')

if (!fs.existsSync('./dist/images')) {
  fs.mkdirSync('./dist/images')
}


fs.readdirSync(base).map(file => {
  const startFile = path.join(base, file)
  const target = path.join(t, file)

  // console.log(startFile, target)

  const tt = fs.createWriteStream(target)
  const s = fs.createReadStream(startFile)

  s.pipe(tt)
})