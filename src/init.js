import { Icon } from "leaflet";
import { setup } from "./gestureHandling/leaflet-gesture-handling";

let fixed = false

const init = () => {

  if (!fixed && process.client) {
    fixed = true

    setup()

    require('vue2-leaflet-nuxt/dist/style.css')

    delete (Icon.Default.prototype)._getIconUrl
    Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    })
  }

}




export default init