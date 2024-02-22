import type { SourceCodeTransformer } from '@unocss/core'
import { escapeRegExp, expandVariantGroup } from '@unocss/core'

import { charCombinations } from './utils'

export interface CompileClassOptions {
  /**
   * Trigger regex literal. The default trigger regex literal matches `:uno:`,
   * for example: `<div class=":uno: font-bold text-white">`.
   *
   * @example
   * The trigger additionally allows defining a capture group named `name`, which
   * allows custom class names. One possible regex would be:
   *
   * ```
   * export default defineConfig({
   *   transformers: [
   *     transformerCompileClass({
   *       trigger: /(["'`]):uno(?:-)?(?<name>[^\s\1]+)?:\s([^\1]*?)\1/g
   *     }),
   *   ],
   * })
   * ```
   *
   * This regular expression matches `:uno-MYNAME:` and uses `MYNAME` in
   * combination with the class prefix as the final class name, for example:
   * `.uno-MYNAME`. It should be noted that the regex literal needs to include
   * the global flag `/g`.
   *
   * @note
   * This parameter is backwards compatible. It accepts string only trigger
   * words, like `:uno:` or a regex literal.
   *
   * @default `/(["'`]):uno(?:-)?(?<name>[^\s\1]+)?:\s([^\1]*?)\1/g`
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

export default function transformerClassnamesMinifier(options: CompileClassOptions = {}): SourceCodeTransformer {
  const {
    trigger = '',
    hashFn = charCombinations(),
  } = options

  const compiledClass = new Map()

  const regexp = RegExp(`(["'\`])${escapeRegExp(trigger)}${trigger ? '\\s' : ''}(.*?)\\1`, 'g')

  return {
    name: 'name',
    enforce: 'pre',
    async transform(s, _, { uno }) {
      const matches = [...s.original.matchAll(regexp)]
      if (!matches.length)
        return

      for (const match of matches) {
        const body = match.length ? expandVariantGroup(match[2].trim()) : ''

        const start = match.index!
        const replacements = []

        const result = await Promise.all(body.split(/\s+/).filter(Boolean).map(async i => [i, !!await uno.parseToken(i)] as const))
        const known = result.filter(([, matched]) => matched).map(([i]) => i)
        const unknown = result.filter(([, matched]) => !matched).map(([i]) => i)

        replacements.push(...unknown)

        known.forEach((i) => {
          const compiled = compiledClass.get(i)

          if (compiled)
            return replacements.push(compiled)

          const className = hashFn()

          compiledClass.set(i, className)

          if (options.layer)
            uno.config.shortcuts.push([className, i, { layer: options.layer }])
          else
            uno.config.shortcuts.push([className, i])

          replacements.push(className)
        })
        
        s.overwrite(start + 1, start + match[0].length - 1, replacements.join(' '))
      }
    },
  }
}
