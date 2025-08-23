import { ref, onUnmounted } from 'vue'

interface debounceParams {
  fn: () => void
  timeout?: number
}

export const useDebounce = () => {
  const timeoutId = ref<ReturnType<typeof setTimeout> | null>(null)

  const debounceFn = (
    fn: debounceParams['fn'],
    timeout: debounceParams['timeout'] = 500,
  ) => {
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
    }
    timeoutId.value = setTimeout(() => {
      fn()
    }, timeout)
  }

  onUnmounted(() => {
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
    }
  })

  return debounceFn
}
