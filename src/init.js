let fixed = false

if (!fixed && process.client) {
  fixed = true
  const L = require('leaflet')
  require('leaflet/dist/leaflet.css')

  try {
    globalThis.L = L
    require('leaflet-gesture-handling')
    require('leaflet-gesture-handling/dist/leaflet-gesture-handling.css')
  } catch (e) { }


  delete (L.Icon.Default.prototype)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  })
}