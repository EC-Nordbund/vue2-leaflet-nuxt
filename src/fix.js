let fixed = false

if (fixed || process.client) {
  return
} else {
  fixed = true
  const L = require('leaflet')
  require('leaflet/dist/leaflet.css')

  delete (L.Icon.Default.prototype)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  })
}