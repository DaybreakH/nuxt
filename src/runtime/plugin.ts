import { defineNuxtPlugin } from '#app'
import { createCache, provideStyleContext } from '@antdv-next/cssinjs'

export default defineNuxtPlugin(
  (nuxtApp) => {
    try {
      const cache = createCache()
      const ssrEvent = nuxtApp.ssrContext?.event

      provideStyleContext(nuxtApp.vueApp, {
        value: {
          cache,
          defaultCache: false,
          ...(ssrEvent ? { mock: 'server' as const } : {}),
        },
      } as never)

      if (ssrEvent) {
        ssrEvent.context.__antdvCssInJsCache = cache
      }
    }
    catch (error) {
      console.error('[antdv-next/nuxt] Failed to initialize CSS-in-JS:', error)
    }
  },
)
