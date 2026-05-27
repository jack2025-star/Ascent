<template>
  <div id="app">
    <a href="#main-content" class="skip-link">跳转到主要内容</a>

    <nav class="navbar" aria-label="主导航">
      <div class="nav-container">
        <router-link to="/" class="logo" aria-label="Mini Mall 首页">
          <span class="logo-icon" aria-hidden="true">🛍️</span>
          <span class="logo-text">Mini Mall</span>
        </router-link>

        <ul class="nav-links" role="list">
          <li>
            <router-link to="/" class="nav-link" active-class="active" aria-current="page">
              <span class="nav-icon" aria-hidden="true">🏠</span>
              <span>首页</span>
            </router-link>
          </li>
          <li>
            <router-link to="/cart" class="nav-link cart-link" active-class="active">
              <span class="nav-icon" aria-hidden="true">🛒</span>
              <span>购物车</span>
              <span v-if="cartStore.totalCount > 0" class="cart-badge" :aria-label="`购物车有 ${cartStore.totalCount} 件商品`">
                {{ cartStore.totalCount }}
              </span>
            </router-link>
          </li>
          <li v-if="authStore.isLoggedIn">
            <router-link to="/profile" class="nav-link profile-link" active-class="active">
              <span class="avatar-small" aria-hidden="true">{{ authStore.user.avatar }}</span>
              <span>{{ authStore.user.username }}</span>
            </router-link>
          </li>
          <li v-else>
            <router-link to="/login" class="nav-link login-btn" active-class="active">
              <span class="nav-icon" aria-hidden="true">👤</span>
              <span>登录</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <main id="main-content" class="main-content" ref="mainContent" tabindex="-1">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="footer" role="contentinfo">
      <p>© 2026 Mini Mall · Vue Router 迷你商城作业</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from './stores/cart'
import { useAuthStore } from './stores/auth'

const cartStore = useCartStore()
const authStore = useAuthStore()
const mainContent = ref(null)
const route = useRoute()

watch(() => route.path, () => {
  requestAnimationFrame(() => {
    mainContent.value?.focus()
  })
})
</script>

<style>
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --orange: #E8723A;
  --orange-light: #F5A623;
  --dark: #1A1A2E;
  --dark-light: #2D2D44;
  --cream: #FFF8F0;
  --cream-dark: #F5EDE3;
  --mint: #4ECDC4;
  --mint-light: #A8E6CF;
  --red: #FF6B6B;
  --gray: #8E8E93;
  --gray-light: #C7C7CC;
  --shadow: 0 4px 20px rgba(26, 26, 46, 0.08);
  --shadow-hover: 0 8px 32px rgba(26, 26, 46, 0.15);
  --radius: 16px;
  --radius-sm: 10px;
  --font-display: 'Playfair Display', serif;
  --font-body: 'Noto Sans SC', -apple-system, sans-serif;
}

body {
  font-family: var(--font-body);
  background: var(--cream);
  color: var(--dark);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  cursor: pointer;
  border: none;
  background: transparent;
  font-family: var(--font-body);
}

:focus-visible {
  outline: 3px solid var(--orange);
  outline-offset: 2px;
  border-radius: 4px;
}

.skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  z-index: 200;
  padding: 12px 24px;
  background: var(--dark);
  color: white;
  border-radius: 0 0 8px 8px;
  font-size: 14px;
  font-weight: 600;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 0;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 248, 240, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(26, 26, 46, 0.06);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  color: var(--dark);
  transition: transform 0.2s;
}

.logo:hover {
  transform: scale(1.03);
}

.logo-icon {
  font-size: 28px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 6px;
  list-style: none;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 500;
  color: var(--dark-light);
  transition: all 0.25s ease;
  position: relative;
}

.nav-link:hover {
  background: rgba(232, 114, 58, 0.08);
  color: var(--orange);
}

.nav-link.active {
  background: var(--orange);
  color: white;
}

.nav-icon {
  font-size: 16px;
}

.cart-link {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: 2px;
  right: 6px;
  background: var(--red);
  color: white;
  font-size: 11px;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: badgePop 0.3s ease;
}

@keyframes badgePop {
  0% { transform: scale(0); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

.avatar-small {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--orange), var(--orange-light));
  color: white;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-content {
  min-height: calc(100vh - 64px - 60px);
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
  outline: none;
}

.footer {
  text-align: center;
  padding: 20px;
  font-size: 13px;
  color: var(--gray);
  border-top: 1px solid rgba(26, 26, 46, 0.06);
}

.page-enter-active {
  animation: pageIn 0.35s ease-out;
}

.page-leave-active {
  animation: pageOut 0.2s ease-in;
}

@keyframes pageIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pageOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-8px);
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .page-enter-active,
  .page-leave-active {
    animation: none;
  }
}

@media (max-width: 768px) {
  .nav-container {
    padding: 0 16px;
  }
  .logo-text {
    display: none;
  }
  .nav-link span:not(.nav-icon):not(.cart-badge):not(.avatar-small) {
    display: none;
  }
  .nav-link {
    padding: 8px 12px;
  }
  .main-content {
    padding: 20px 16px;
  }
}
</style>
