import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Unocss from 'unocss/vite'
import transformerVariantGroup from '@unocss/transformer-variant-group'

import { transformerCompileClass } from '../src/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Unocss({
    transformers: [
      transformerCompileClass(),
      transformerVariantGroup()
    ]
  }),
  {
    name: 'asd',
    enforce: 'pre',
    renderDynamicImport(...args) {
      console.log(args)
    }
  }
],

})

// https://rollupjs.org/plugin-development/#renderdynamicimport