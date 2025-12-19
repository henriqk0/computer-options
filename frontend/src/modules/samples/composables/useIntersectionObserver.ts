import { onMounted, onUnmounted, type Ref } from 'vue'

export interface UseIntersectionObserverOptions {
  rootMargin?: string
  threshold?: number | number[]
}

/**
 * Composable for setting up Intersection Observer
 * Useful for infinite scroll, lazy loading, and visibility tracking
 */
export function useIntersectionObserver(
  targetRef: Ref<HTMLElement | null>,
  callback: () => void,
  options: UseIntersectionObserverOptions = {}
) {
  let observer: IntersectionObserver | null = null

  const defaultOptions: IntersectionObserverInit = {
    rootMargin: options.rootMargin || '160px',
    threshold: options.threshold || 0,
  }

  onMounted(() => {
    if (!targetRef.value) return

    observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        callback()
      }
    }, defaultOptions)

    observer.observe(targetRef.value)
  })

  onUnmounted(() => {
    if (observer && targetRef.value) {
      observer.unobserve(targetRef.value)
      observer.disconnect()
      observer = null
    }
  })

  return {
    observer,
  }
}
