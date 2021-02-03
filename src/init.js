import { Icon } from "leaflet";
import { setup } from "./gestureHandling/leaflet-gesture-handling";

let fixed = false

const init = () => {

  if (!fixed && process.client) {
    fixed = true

    setup()

    require('@ec-nordbund/nuxt-vue2-leaflet/dist/style.css')

    delete (Icon.Default.prototype)._getIconUrl
    Icon.Default.mergeOptions({
      iconRetinaUrl: require('@ec-nordbund/nuxt-vue2-leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('@ec-nordbund/nuxt-vue2-leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('@ec-nordbund/nuxt-vue2-leaflet/dist/images/marker-shadow.png')
    })
  }

}




export default init