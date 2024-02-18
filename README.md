# unocss-transformer-classnames-minifier

Transform UnoCSS classnames minifier.

## Install
```shell
pnpm i -D unocss-transformer-classnames-minifier
```

```ts
// uno.config.ts
import { defineConfig } from 'unocss'
import transformerClassnamesMinifier from 'unocss-transformer-classnames-minifier'

export default defineConfig({
  // ...
  transformers: [
    transformerAlias(),
  ],
})
```

## Usage

```html
<button class="px-2 py-3 bg-blue-500 text-white rounded"></button>
```

Will be transformed to:

```html
<button class="a b c d f"></button>
```

## Options

> I suggest you to use special prefixes to avoid UnoCSS incorrectly transforming your code.

```ts
transformerClassnamesMinifier({
 
})

interface KeepOption {
  /**
   * 
   * @default ''
   */
  trigger?: string
  /**
   * Hash function
   */
  hashFn?: () => string

  /**
   * The layer name of generated rules
   */
  layer?: string
}
```
