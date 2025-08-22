import { defineNuxtRouteMiddleware } from '#app'

export default defineNuxtRouteMiddleware((to, from) => {
  console.log('🔍 Middleware triggered:', {
    from: from?.path || 'initial',
    to: to.path,
    timestamp: new Date().toISOString(),
  })
})
