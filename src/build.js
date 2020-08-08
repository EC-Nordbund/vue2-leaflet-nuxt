const fs = require('fs')

const genCmp = name => `if(process.client) { require('../fix.js') };export default process.client ? require('Vue2Leaflet/src/components/${name}.vue').default : (process.env.NODE_ENV === 'development' ? {render:h=>h('Component muss in client-only gewrapt werden')} : {})`


if(!fs.existsSync('./components')) {
  fs.mkdirSync('./components')
}

fs.readdirSync('./components').forEach(file => {
  fs.unlinkSync('./components/' + file)
})

fs.readdirSync('../node_modules/vue2-leaflet/src/components').forEach(f => {
  const name = f.split('.')[0]
  fs.writeFileSync('./components/' + name + '.js', genCmp(name))
})