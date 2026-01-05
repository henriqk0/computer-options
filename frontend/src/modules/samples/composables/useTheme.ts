import { ref, watch, type Ref, onMounted, onUnmounted } from 'vue'

type Theme = 'light' | 'dark' | 'auto'

const theme: Ref<Theme> = ref(
  (localStorage.getItem('theme') as Theme) || 'auto'
)

let mediaQuery: MediaQueryList | null = null
let mediaListener: ((e: MediaQueryListEvent) => void) | null = null

function applyTheme() {
  const root = document.documentElement
  root.classList.remove('dark')

  if (
    theme.value === 'dark' ||
    (theme.value === 'auto' && mediaQuery?.matches)
  ) {
    root.classList.add('dark')
  }
}

export function useTheme() {
  onMounted(() => {
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    mediaListener = () => {
      if (theme.value === 'auto') {
        applyTheme()
      }
    }

    mediaQuery.addEventListener('change', mediaListener)

    applyTheme()
  })

  onUnmounted(() => {
    if (mediaQuery && mediaListener) {
      mediaQuery.removeEventListener('change', mediaListener)
    }
  })

  watch(theme, (value) => {
    localStorage.setItem('theme', value)
    applyTheme()
  })

  return { theme }
}
