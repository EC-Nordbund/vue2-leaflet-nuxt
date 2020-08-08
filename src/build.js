const fs = require('fs')

const genCmp = name => `if(process.client) { require('../fix.js') };export default process.client ? require('vue2-leaflet/dist/components/${name}.js').default : (process.env.NODE_ENV === 'development' ? {render:h=>h('Component muss in client-only gewrapt werden')} : {})`


if(!fs.existsSync('./src/components')) {
  fs.mkdirSync('./src/components')
}

fs.readdirSync('./src/components').forEach(file => {
  fs.unlinkSync('./src/components/' + file)
})

fs.readdirSync('./node_modules/vue2-leaflet/src/components').forEach(f => {
  const name = f.split('.')[0]
  fs.writeFileSync('./src/components/' + name + '.js', genCmp(name))
})