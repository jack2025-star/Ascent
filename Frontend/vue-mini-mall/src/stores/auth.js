import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const orders = ref([
    {
      id: 'ORD-20260501',
      date: '2026-05-01',
      items: ['机械键盘 ×1', '显示器 ×1'],
      total: 2298,
      status: '已完成'
    },
    {
      id: 'ORD-20260515',
      date: '2026-05-15',
      items: ['无线鼠标 ×2'],
      total: 358,
      status: '配送中'
    }
  ])

  const isLoggedIn = computed(() => user.value !== null)

  function login(username, password) {
    if (username && password) {
      user.value = {
        username,
        avatar: username.charAt(0).toUpperCase(),
        email: `${username}@example.com`,
        joinDate: '2026-01-15'
      }
      return true
    }
    return false
  }

  function logout() {
    user.value = null
  }

  return {
    user,
    orders,
    isLoggedIn,
    login,
    logout
  }
})
