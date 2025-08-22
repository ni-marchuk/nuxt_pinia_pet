import { ref, onUnmounted } from 'vue'

interface debounceParams {
  fn: () => void
  timeout?: number
}

export const useThrottle = () => {
  const isCalled = ref<boolean>(false)
  const timeoutId = ref<ReturnType<typeof setTimeout> | null>(null)

  const throttleFn = (
    fn: debounceParams['fn'],
    timeout: debounceParams['timeout'] = 500,
  ) => {
    if (!isCalled.value) {
      isCalled.value = true
      timeoutId.value = setTimeout(() => {
        fn()
        isCalled.value = false
      }, timeout)
    }
  }

  onUnmounted(() => {
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
    }
  })

  return throttleFn
}
