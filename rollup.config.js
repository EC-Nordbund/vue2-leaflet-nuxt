import * as fs from 'fs'
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";

const genEntry = fs.readdirSync('./src/components').map(v => [v.split('.')[0], `./src/components/${v}`])

const entry = {}

genEntry.forEach(v => {
  entry[v[0]] = v[1]
})

// console.log(entry)

export default {
  output: {
    dir: './dist',
    entryFileNames: '[name].js',
  },
  input: entry,
  plugins: [
    json(),
    commonjs({
      include: './src/components/*.js',
      transformMixedEsModules: true
    }),
    terser()
  ]
}


