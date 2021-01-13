# vue2-leaflet-nuxt
> Helper für vue2-leaflet für nuxt

## Install
```sh
yarn add vue2-leaflet-nuxt vue2-leaflet
# Optional
yarn add leaflet-gesture-handling
```

In your config add:
```js
// nuxt.config.js

export default {
  components: true, // Important
  modules: ['vue2-leaflet-nuxt'],
}

```

Done.

## What does this do?
1. Adds components to @nuxt/components so they are automaticly importet as needed. (see https://github.com/nuxt/components)
2. On SSR it replaces the components with a dummy-Component (you should wrap them in client-only)
3. On first use of a component it sets the images load css and if installed add leaflet-gesture-handling

### How?
Component that is imported looks like
```js
if (process.client) {
  require("../init.js");
}
export default process.client
  ? /*#__PURE__*/ require("vue2-leaflet/dist/components/LCircleMarker.js")
      .default
  : /*#__PURE__*/ require("../noop.js").default;
```
In `init.js` there are some config changes to Leaflet. `noop.js` is a empty component. The PURE comments are good for treeshaking.

Noop:
```js
export default process.env.NODE_ENV === "development"
  ? { render: (h) => h("Component muss in client-only gewrapt werden") }
  : {};
```



