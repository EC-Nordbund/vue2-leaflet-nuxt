const fs = require('fs')

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