import { effectScope, onScopeDispose } from 'vue'

export const useThrottle = () => {
  const scope = effectScope()
  let isCalled: boolean = false
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const throttleFn = (
    fn: () => void, timeout = 500,
  ) => {
    if (!isCalled) {
      isCalled = true
      timeoutId = setTimeout(() => {
        fn()
        isCalled = false
      }, timeout)
    }
  }

  scope.run(() => {
    onScopeDispose(() => {
      if (timeoutId) clearTimeout(timeoutId)
    })
  })

  return { throttleFn, stop: () => scope.stop() }
}
