import { effectScope, onScopeDispose } from 'vue'

export const useDebounce = () => {
  const scope = effectScope()
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const debounceFn = (fn: () => void, timeout = 500) => {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(fn, timeout)
  }

  scope.run(() => {
    onScopeDispose(() => {
      if (timeoutId) clearTimeout(timeoutId)
    })
  })

  return { debounceFn, stop: () => scope.stop() }
}
