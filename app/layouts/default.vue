<template>
  <div class="layout">
    <header class="header">
      <nav class="nav">
        <NuxtLink to="/" class="nav-link">🏠 Home</NuxtLink>
        <NuxtLink to="/counter" class="nav-link">🔢 Counter</NuxtLink>
        <NuxtLink to="/users" class="nav-link">👥 Users</NuxtLink>
      </nav>
    </header>
    <main class="container">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.header {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(6px);
  padding: 1rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.container {
  padding: 2rem;
}
</style> 