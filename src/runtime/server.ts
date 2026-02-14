import { defineNitroPlugin } from 'nitropack/runtime'
import { extractStyle } from '@antdv-next/cssinjs'

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:html', (html, { event }) => {
    const cache = event.context.__antdvCssInJsCache
    if (cache) {
      try {
        const style = extractStyle(cache)
        if (style) {
          html.head.unshift(style)
        }
      }
      catch (error) {
        console.error('[antdv-next/nuxt] Failed to extract CSS-in-JS styles:', error)
      }
    }
  })
})
