export default defineNuxtRouteMiddleware((to, from) => {
  console.log('Hello from global Middleware:', {
    from: from?.path || 'initial',
    to: to.path,
    timestamp: new Date().toISOString(),
  })
})
