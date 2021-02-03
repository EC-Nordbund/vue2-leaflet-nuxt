import * as fs from 'fs'
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";

const genEntry = fs.readdirSync('./src/components').map(v => [v.split('.')[0], `./src/components/${v}`])

const entry = {}

genEntry.forEach(v => {
  entry[v[0]] = v[1]
})


export default {
  output: {
    dir: './dist',
    entryFileNames: '[name].js',
  },
  input: entry,
  plugins: [
    {
      name: 'leaflet',
      resolveId(id) {
        if (id === 'leaflet') {
          return '@ec-nordbund/leaflet'
        }
      }
    },
    nodeResolve(),
    json(),
    commonjs({
      include: './src/components/*.js',
      transformMixedEsModules: true
    }),
    terser()
  ],
  external: [
    '@ec-nordbund/leaflet'
  ]
}


