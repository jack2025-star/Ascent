<template>
  <div class="profile-page">
    <div class="profile-header">
      <div class="profile-avatar" aria-hidden="true">
        <span class="avatar-letter">{{ authStore.user.avatar }}</span>
      </div>
      <div class="profile-info">
        <h1 class="profile-name">{{ authStore.user.username }}</h1>
        <p class="profile-email">{{ authStore.user.email }}</p>
        <p class="profile-join">加入于 {{ authStore.user.joinDate }}</p>
      </div>
      <button class="logout-btn" @click="handleLogout" aria-label="退出登录">退出登录</button>
    </div>

    <div class="profile-stats">
      <div class="stat-card">
        <span class="stat-number">{{ authStore.orders.length }}</span>
        <span class="stat-label">订单</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">{{ cartStore.totalCount }}</span>
        <span class="stat-label">购物车</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">{{ formatPrice(totalSpent) }}</span>
        <span class="stat-label">累计消费</span>
      </div>
    </div>

    <section class="orders-section">
      <h2 class="section-title">
        <span class="section-icon">📦</span>
        我的订单
      </h2>

      <div class="orders-list">
        <div v-for="order in authStore.orders" :key="order.id" class="order-card">
          <div class="order-header">
            <div class="order-id-group">
              <span class="order-id">{{ order.id }}</span>
              <span class="order-date">{{ order.date }}</span>
            </div>
            <span class="order-status" :class="order.status === '已完成' ? 'done' : 'shipping'">
              {{ order.status }}
            </span>
          </div>
          <div class="order-items">
            <span v-for="item in order.items" :key="item" class="order-item-tag">{{ item }}</span>
          </div>
          <div class="order-footer">
            <span class="order-total">{{ formatPrice(order.total) }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'
import { formatPrice } from '../utils/format'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()

const totalSpent = computed(() => {
  return authStore.orders.reduce((sum, order) => sum + order.total, 0)
})

function handleLogout() {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.profile-header {
  background: linear-gradient(135deg, var(--dark) 0%, var(--dark-light) 100%);
  border-radius: 24px;
  padding: 40px;
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
}

.profile-header::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -20%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(232, 114, 58, 0.15) 0%, transparent 70%);
  border-radius: 50%;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--orange) 0%, var(--orange-light) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 20px rgba(232, 114, 58, 0.3);
}

.avatar-letter {
  font-size: 36px;
  font-weight: 800;
  color: white;
  font-family: var(--font-display);
}

.profile-info {
  flex: 1;
  position: relative;
  z-index: 1;
}

.profile-name {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  color: white;
  margin-bottom: 4px;
}

.profile-email {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2px;
}

.profile-join {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.65);
}

.logout-btn {
  padding: 10px 24px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  border-radius: 50px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s;
  position: relative;
  z-index: 1;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.profile-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  border-radius: var(--radius);
  padding: 24px;
  text-align: center;
  box-shadow: var(--shadow);
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-3px);
}

.stat-number {
  display: block;
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 800;
  color: var(--orange);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  color: var(--gray);
}

.orders-section {
  background: white;
  border-radius: 24px;
  padding: 32px;
  box-shadow: var(--shadow);
}

.section-title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-icon {
  font-size: 24px;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.order-card {
  border: 1px solid var(--cream-dark);
  border-radius: var(--radius-sm);
  padding: 20px;
  transition: all 0.2s;
}

.order-card:hover {
  border-color: var(--orange);
  box-shadow: 0 2px 12px rgba(232, 114, 58, 0.08);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.order-id-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.order-id {
  font-size: 14px;
  font-weight: 700;
  color: var(--dark);
}

.order-date {
  font-size: 12px;
  color: var(--gray);
}

.order-status {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 50px;
}

.order-status.done {
  background: #E8F8F5;
  color: var(--mint);
}

.order-status.shipping {
  background: #FFF3E0;
  color: var(--orange);
}

.order-items {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.order-item-tag {
  background: var(--cream);
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  color: var(--dark-light);
}

.order-footer {
  display: flex;
  justify-content: flex-end;
}

.order-total {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  color: var(--orange);
  font-variant-numeric: tabular-nums;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
    padding: 32px 24px;
  }
  .profile-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  .stat-card {
    padding: 16px 8px;
  }
  .stat-number {
    font-size: 22px;
  }
  .orders-section {
    padding: 20px;
  }
}
</style>
