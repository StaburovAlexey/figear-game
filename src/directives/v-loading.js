import { createApp, h, unref } from 'vue'
import Preloader from '../components/PreloaderComponent.vue'

export default {
  mounted(el, binding) {
    const container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.top = 0
    container.style.left = 0
    container.style.width = '100%'
    container.style.height = '100%'
    container.style.zIndex = '9999'
    container.style.pointerEvents = 'none'

    const computedStyle = getComputedStyle(el)
    if (computedStyle.position === 'static') {
      el.style.position = 'relative'
    }

    const getText = () =>
      typeof binding.value === 'object'
        ? (unref(binding.value.text) ?? 'Загрузка...')
        : 'Загрузка...'

    const app = createApp({
      render() {
        return h(Preloader, { text: getText() })
      },
    })

    el._loading = {
      container,
      app,
      mounted: false,
    }

    const show =
      typeof binding.value === 'object' ? unref(binding.value.show) : unref(binding.value)

    if (show) {
      el.appendChild(container)
      app.mount(container)
      el._loading.mounted = true
    }
  },

  updated(el, binding) {
    const isShown =
      typeof binding.value === 'object' ? unref(binding.value.show) : unref(binding.value)

    const wasShown =
      typeof binding.oldValue === 'object' ? unref(binding.oldValue?.show) : unref(binding.oldValue)

    if (isShown === wasShown) return

    const { container } = el._loading

    if (isShown) {
      // ❗ пересоздаём app заново
      const app = createApp({
        render() {
          const text =
            typeof binding.value === 'object'
              ? (unref(binding.value.text) ?? 'Загрузка...')
              : 'Загрузка...'
          return h(Preloader, { text })
        },
      })

      el._loading.app = app
      el.appendChild(container)
      app.mount(container)
      el._loading.mounted = true
    } else if (!isShown && el._loading.mounted) {
      el._loading.app?.unmount()
      el.removeChild(container)
      el._loading.mounted = false
      el._loading.app = null
    }
  },

  unmounted(el) {
    if (el._loading?.mounted) {
      el._loading.app.unmount()
      el.removeChild(el._loading.container)
    }
    delete el._loading
  },
}
