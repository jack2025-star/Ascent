<template>
  <div class="cart-page">
    <h1 class="page-title">
      <span class="title-emoji" aria-hidden="true">🛒</span>
      购物车
      <span class="title-count" v-if="cartStore.totalCount > 0">{{ cartStore.totalCount }} 件商品</span>
    </h1>

    <div v-if="cartStore.items.length === 0" class="empty-cart" role="status">
      <span class="empty-emoji" aria-hidden="true">🛒</span>
      <h2>购物车是空的</h2>
      <p>去逛逛，发现好物吧</p>
      <router-link to="/" class="go-shopping">去购物 →</router-link>
    </div>

    <div v-else class="cart-layout">
      <div class="cart-items">
        <TransitionGroup name="cart-item">
          <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
            <router-link :to="`/product/${item.id}`" class="item-image" :aria-label="`查看 ${item.name}`">
              <span class="item-emoji" aria-hidden="true">{{ item.emoji }}</span>
            </router-link>
            <div class="item-info">
              <router-link :to="`/product/${item.id}`" class="item-name">{{ item.name }}</router-link>
              <span class="item-category">{{ item.category }}</span>
              <span class="item-price">{{ formatPrice(item.price) }}</span>
            </div>
            <div class="item-actions">
              <div class="quantity-control" role="group" :aria-label="`${item.name} 数量控制`">
                <button class="qty-btn" @click="cartStore.updateQuantity(item.id, item.quantity - 1)" :aria-label="`减少 ${item.name} 数量`" :disabled="item.quantity <= 1">−</button>
                <span class="qty-value" aria-live="polite" aria-atomic="true">{{ item.quantity }}</span>
                <button class="qty-btn" @click="cartStore.updateQuantity(item.id, item.quantity + 1)" :aria-label="`增加 ${item.name} 数量`">+</button>
              </div>
              <span class="item-subtotal" :aria-label="`小计 ${formatPrice(item.price * item.quantity)}`">{{ formatPrice(item.price * item.quantity) }}</span>
              <button class="remove-btn" @click="cartStore.removeItem(item.id)" :aria-label="`从购物车移除 ${item.name}`">✕</button>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <div class="cart-summary">
        <h3 class="summary-title">订单摘要</h3>
        <div class="summary-row">
          <span>商品数量</span>
          <span>{{ cartStore.totalCount }} 件</span>
        </div>
        <div class="summary-row">
          <span>商品总价</span>
          <span>{{ formatPrice(cartStore.totalPrice) }}</span>
        </div>
        <div class="summary-row">
          <span>运费</span>
          <span class="free-shipping">免运费</span>
        </div>
        <div class="summary-divider"></div>
        <div class="summary-row total-row">
          <span>合计</span>
          <span class="total-price">{{ formatPrice(cartStore.totalPrice) }}</span>
        </div>
        <button class="checkout-btn" @click="handleCheckout">
          结算 ({{ cartStore.totalCount }})
        </button>
        <button class="clear-btn" @click="cartStore.clearCart()">清空购物车</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
import { formatPrice } from '../utils/format'

const cartStore = useCartStore()

function handleCheckout() {
  alert(`订单提交成功！共 ${cartStore.totalCount} 件商品，合计 ${formatPrice(cartStore.totalPrice)}`)
  cartStore.clearCart()
}
</script>

<style scoped>
.page-title {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  gap: 12px;
  text-wrap: balance;
}

.title-emoji {
  font-size: 36px;
}

.title-count {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: var(--gray);
  background: var(--cream-dark);
  padding: 4px 14px;
  border-radius: 50px;
}

.empty-cart {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 24px;
  box-shadow: var(--shadow);
}

.empty-emoji {
  font-size: 72px;
  display: block;
  margin-bottom: 16px;
  opacity: 0.4;
}

.empty-cart h2 {
  font-family: var(--font-display);
  font-size: 24px;
  margin-bottom: 8px;
}

.empty-cart p {
  color: var(--gray);
  margin-bottom: 24px;
}

.go-shopping {
  display: inline-block;
  padding: 12px 32px;
  background: var(--orange);
  color: white;
  border-radius: 50px;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.2s;
}

.go-shopping:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 16px rgba(232, 114, 58, 0.3);
}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 32px;
  align-items: start;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cart-item {
  background: white;
  border-radius: var(--radius);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
}

.cart-item:hover {
  box-shadow: var(--shadow-hover);
}

.item-image {
  width: 72px;
  height: 72px;
  background: var(--cream);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.2s;
}

.item-image:hover {
  transform: scale(1.05);
}

.item-emoji {
  font-size: 36px;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-name {
  display: block;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
  transition: color 0.2s;
}

.item-name:hover {
  color: var(--orange);
}

.item-category {
  display: block;
  font-size: 12px;
  color: var(--gray);
  margin-bottom: 4px;
}

.item-price {
  font-size: 14px;
  font-weight: 600;
  color: var(--dark-light);
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.quantity-control {
  display: flex;
  align-items: center;
  background: var(--cream);
  border-radius: 10px;
  overflow: hidden;
}

.qty-btn {
  width: 36px;
  height: 36px;
  background: transparent;
  font-size: 16px;
  font-weight: 600;
  color: var(--dark-light);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.qty-btn:hover:not(:disabled) {
  background: var(--cream-dark);
}

.qty-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.qty-value {
  width: 36px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
}

.item-subtotal {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: var(--orange);
  min-width: 80px;
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.remove-btn {
  width: 44px;
  height: 44px;
  background: transparent;
  border-radius: 10px;
  font-size: 16px;
  color: var(--gray-light);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.remove-btn:hover {
  background: #FFF0F0;
  color: var(--red);
}

.cart-summary {
  background: white;
  border-radius: var(--radius);
  padding: 28px;
  box-shadow: var(--shadow);
  position: sticky;
  top: 96px;
}

.summary-title {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 14px;
  color: var(--dark-light);
}

.free-shipping {
  color: var(--mint);
  font-weight: 600;
}

.summary-divider {
  height: 1px;
  background: var(--cream-dark);
  margin: 12px 0;
}

.total-row {
  font-size: 16px;
  font-weight: 700;
  color: var(--dark);
}

.total-price {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 800;
  color: var(--orange);
  font-variant-numeric: tabular-nums;
}

.checkout-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, var(--orange) 0%, var(--orange-light) 100%);
  color: white;
  font-size: 16px;
  font-weight: 700;
  border-radius: 12px;
  margin-top: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(232, 114, 58, 0.3);
}

.checkout-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(232, 114, 58, 0.4);
}

.clear-btn {
  width: 100%;
  padding: 10px;
  background: transparent;
  color: var(--gray);
  font-size: 13px;
  margin-top: 8px;
  border-radius: 8px;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: #FFF0F0;
  color: var(--red);
}

.cart-item-enter-active {
  transition: all 0.3s ease;
}

.cart-item-leave-active {
  transition: all 0.3s ease;
}

.cart-item-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.cart-item-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

@media (max-width: 768px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }
  .cart-item {
    flex-wrap: wrap;
    gap: 12px;
    padding: 16px;
  }
  .item-actions {
    width: 100%;
    justify-content: space-between;
  }
  .cart-summary {
    position: static;
  }
}
</style>
