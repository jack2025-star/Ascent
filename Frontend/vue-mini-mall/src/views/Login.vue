<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <span class="login-emoji">👋</span>
        <h1 class="login-title">欢迎回来</h1>
        <p class="login-subtitle">登录你的账户，继续购物之旅</p>
      </div>

      <form class="login-form" @submit.prevent="handleLogin" novalidate>
        <div class="form-group">
          <label class="form-label" for="login-username">用户名</label>
          <div class="input-wrapper">
            <span class="input-icon" aria-hidden="true">👤</span>
            <input
              id="login-username"
              v-model="username"
              type="text"
              class="form-input"
              placeholder="请输入用户名"
              autocomplete="username"
              required
              aria-required="true"
              :aria-invalid="!!errorMsg && !username.trim()"
              aria-describedby="login-error"
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="login-password">密码</label>
          <div class="input-wrapper">
            <span class="input-icon" aria-hidden="true">🔒</span>
            <input
              id="login-password"
              v-model="password"
              type="password"
              class="form-input"
              placeholder="请输入密码"
              autocomplete="current-password"
              required
              aria-required="true"
              :aria-invalid="!!errorMsg && !password.trim()"
              aria-describedby="login-error"
            />
          </div>
        </div>

        <p v-if="errorMsg" id="login-error" class="error-msg" role="alert">{{ errorMsg }}</p>

        <button type="submit" class="login-btn" :disabled="loading" :aria-busy="loading">
          <span v-if="loading" class="spinner" aria-hidden="true"></span>
          <span>{{ loading ? '登录中…' : '登 录' }}</span>
        </button>
      </form>

      <div class="login-footer">
        <p class="hint-text" aria-label="提示信息">💡 提示：输入任意用户名和密码即可登录</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const errorMsg = ref('')
const loading = ref(false)

async function handleLogin() {
  errorMsg.value = ''

  if (!username.value.trim()) {
    errorMsg.value = '请输入用户名'
    return
  }
  if (!password.value.trim()) {
    errorMsg.value = '请输入密码'
    return
  }

  loading.value = true

  await new Promise(resolve => setTimeout(resolve, 800))

  const success = authStore.login(username.value, password.value)

  loading.value = false

  if (success) {
    const redirect = route.query.redirect || '/'
    router.push(redirect)
  } else {
    errorMsg.value = '登录失败，请重试'
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
}

.login-card {
  background: white;
  border-radius: 24px;
  padding: 48px 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: var(--shadow);
}

.login-header {
  text-align: center;
  margin-bottom: 36px;
}

.login-emoji {
  font-size: 48px;
  display: block;
  margin-bottom: 12px;
}

.login-title {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 6px;
}

.login-subtitle {
  font-size: 14px;
  color: var(--gray);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--dark-light);
}

.input-wrapper {
  display: flex;
  align-items: center;
  background: var(--cream);
  border-radius: 12px;
  padding: 0 16px;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.input-wrapper:focus-within {
  border-color: var(--orange);
  background: white;
  box-shadow: 0 0 0 4px rgba(232, 114, 58, 0.1);
}

.input-icon {
  font-size: 16px;
  margin-right: 10px;
}

.form-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 14px 0;
  font-size: 15px;
  font-family: var(--font-body);
  color: var(--dark);
  outline: none;
}

.form-input::placeholder {
  color: var(--gray-light);
}

.error-msg {
  font-size: 13px;
  color: var(--red);
  background: #FFF0F0;
  padding: 8px 14px;
  border-radius: 8px;
  text-align: center;
}

.login-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, var(--orange) 0%, var(--orange-light) 100%);
  color: white;
  font-size: 16px;
  font-weight: 700;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(232, 114, 58, 0.3);
  margin-top: 8px;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(232, 114, 58, 0.4);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.login-footer {
  margin-top: 24px;
  text-align: center;
}

.hint-text {
  font-size: 12px;
  color: var(--gray);
  background: var(--cream);
  padding: 10px 16px;
  border-radius: 10px;
}

@media (max-width: 768px) {
  .login-card {
    padding: 32px 24px;
    border-radius: 16px;
  }
  .login-title {
    font-size: 24px;
  }
}
</style>
