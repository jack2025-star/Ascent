<template>
  <div class="product-detail" v-if="product">
    <button class="back-btn" @click="$router.back()" aria-label="返回上一页">
      ← 返回
    </button>

    <div class="detail-layout">
      <div class="detail-image">
        <div class="image-bg">
          <span class="detail-emoji" aria-hidden="true">{{ product.emoji }}</span>
        </div>
        <div class="image-badges">
          <span class="badge category-badge">{{ product.category }}</span>
          <span class="badge rating-badge" :aria-label="`评分 ${product.rating} 星`">★ {{ product.rating }}</span>
        </div>
      </div>

      <div class="detail-info">
        <h1 class="detail-name">{{ product.name }}</h1>
        <p class="detail-price">{{ formatPrice(product.price) }}</p>
        <p class="detail-desc">{{ product.description }}</p>

        <div class="specs-section">
          <h3 class="specs-title">产品规格</h3>
          <ul class="specs-list" role="list">
            <li v-for="spec in product.specs" :key="spec" class="spec-tag">{{ spec }}</li>
          </ul>
        </div>

        <div class="stock-info">
          <span class="stock-label">库存</span>
          <span class="stock-value" :class="{ low: product.stock < 30 }">
            {{ product.stock }} 件
          </span>
        </div>

        <div class="quantity-section">
          <span class="quantity-label" id="qty-label">数量</span>
          <div class="quantity-control" role="group" aria-labelledby="qty-label">
            <button class="qty-btn" @click="quantity > 1 && quantity--" aria-label="减少数量" :disabled="quantity <= 1">−</button>
            <span class="qty-value" aria-live="polite" aria-atomic="true">{{ quantity }}</span>
            <button class="qty-btn" @click="quantity < product.stock && quantity++" aria-label="增加数量" :disabled="quantity >= product.stock">+</button>
          </div>
        </div>

        <button class="add-cart-btn" @click="handleAddToCart" :aria-label="addedToCart ? '已加入购物车' : `将 ${product.name} 加入购物车`">
          <span class="btn-icon" aria-hidden="true">🛒</span>
          <span>{{ addedToCart ? '已加入购物车 ✓' : '加入购物车' }}</span>
        </button>
      </div>
    </div>
  </div>

  <div v-else class="not-found">
    <span class="not-found-emoji">🔍</span>
    <h2>商品不存在</h2>
    <p>该商品可能已下架</p>
    <router-link to="/" class="back-home">返回首页</router-link>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { products } from '../data/products'
import { formatPrice } from '../utils/format'

const route = useRoute()
const cartStore = useCartStore()

const product = computed(() => {
  const id = Number(route.params.id)
  return products.find(p => p.id === id)
})

const quantity = ref(1)
const addedToCart = ref(false)

function handleAddToCart() {
  if (!product.value) return
  for (let i = 0; i < quantity.value; i++) {
    cartStore.addItem(product.value)
  }
  addedToCart.value = true
  setTimeout(() => {
    addedToCart.value = false
  }, 2000)
}
</script>

<style scoped>
.back-btn {
  background: white;
  border: 1px solid var(--cream-dark);
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 500;
  color: var(--dark-light);
  margin-bottom: 24px;
  transition: all 0.2s;
}

.back-btn:hover {
  background: var(--cream-dark);
  color: var(--dark);
}

.detail-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  background: white;
  border-radius: 24px;
  padding: 40px;
  box-shadow: var(--shadow);
}

.detail-image {
  position: relative;
}

.image-bg {
  background: linear-gradient(135deg, var(--cream) 0%, var(--cream-dark) 100%);
  border-radius: 20px;
  height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-emoji {
  font-size: 120px;
  animation: gentleBounce 3s ease-in-out infinite;
}

@keyframes gentleBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.image-badges {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.badge {
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 600;
}

.category-badge {
  background: var(--dark);
  color: white;
}

.rating-badge {
  background: var(--orange-light);
  color: white;
}

.detail-name {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 8px;
}

.detail-price {
  font-family: var(--font-display);
  font-size: 36px;
  font-weight: 800;
  color: var(--orange);
  margin-bottom: 20px;
  font-variant-numeric: tabular-nums;
}

.detail-desc {
  font-size: 15px;
  line-height: 1.8;
  color: var(--dark-light);
  margin-bottom: 24px;
}

.specs-section {
  margin-bottom: 24px;
}

.specs-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--gray);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
}

.specs-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
}

.spec-tag {
  background: var(--cream);
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--dark-light);
}

.stock-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.stock-label {
  font-size: 14px;
  color: var(--gray);
}

.stock-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--mint);
}

.stock-value.low {
  color: var(--red);
}

.quantity-section {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
}

.quantity-label {
  font-size: 14px;
  color: var(--gray);
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 0;
  background: var(--cream);
  border-radius: 12px;
  overflow: hidden;
}

.qty-btn {
  width: 40px;
  height: 40px;
  background: transparent;
  font-size: 18px;
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
  width: 48px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
}

.add-cart-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, var(--orange) 0%, var(--orange-light) 100%);
  color: white;
  font-size: 16px;
  font-weight: 700;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(232, 114, 58, 0.3);
}

.add-cart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(232, 114, 58, 0.4);
}

.add-cart-btn:active {
  transform: translateY(0);
}

.btn-icon {
  font-size: 20px;
}

.not-found {
  text-align: center;
  padding: 80px 20px;
}

.not-found-emoji {
  font-size: 64px;
  display: block;
  margin-bottom: 16px;
}

.not-found h2 {
  font-family: var(--font-display);
  font-size: 28px;
  margin-bottom: 8px;
}

.not-found p {
  color: var(--gray);
  margin-bottom: 24px;
}

.back-home {
  display: inline-block;
  padding: 12px 28px;
  background: var(--orange);
  color: white;
  border-radius: 50px;
  font-weight: 600;
  transition: transform 0.2s;
}

.back-home:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .detail-layout {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 24px;
    border-radius: 16px;
  }
  .image-bg {
    height: 240px;
  }
  .detail-emoji {
    font-size: 80px;
  }
  .detail-name {
    font-size: 24px;
  }
  .detail-price {
    font-size: 28px;
  }
}
</style>
