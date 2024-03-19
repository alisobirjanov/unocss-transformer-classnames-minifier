import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Unocss from 'unocss/vite'
import transformerVariantGroup from '@unocss/transformer-variant-group'

import transformerClassnamesMinifier from 'unocss-transformer-classnames-minifier'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Unocss({
    transformers: [
      transformerClassnamesMinifier(),
      transformerVariantGroup(),
    ],
  })],

})

