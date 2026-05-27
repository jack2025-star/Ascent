<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="hero-line1">发现好物</span>
          <span class="hero-line2">为学习加分 ✨</span>
        </h1>
        <p class="hero-desc">精选数码好物，助力你的学习与生活</p>
      </div>
      <div class="hero-decoration" aria-hidden="true">
        <span class="float-emoji" style="--delay: 0s; --x: 10%; --y: 20%;">⌨️</span>
        <span class="float-emoji" style="--delay: 0.5s; --x: 70%; --y: 10%;">🎧</span>
        <span class="float-emoji" style="--delay: 1s; --x: 40%; --y: 60%;">💡</span>
        <span class="float-emoji" style="--delay: 1.5s; --x: 85%; --y: 50%;">🖱️</span>
      </div>
    </section>

    <section class="products-section">
      <div class="section-header">
        <h2 class="section-title">热门商品</h2>
        <span class="product-count">{{ products.length }} 件好物</span>
      </div>

      <div class="product-grid">
        <router-link
          v-for="(product, index) in products"
          :key="product.id"
          :to="`/product/${product.id}`"
          class="product-card"
          :aria-label="`${product.name}，价格 ${product.price} 元，评分 ${product.rating} 星`"
          :style="{ animationDelay: `${index * 0.08}s` }"
        >
          <div class="product-image">
            <span class="product-emoji" aria-hidden="true">{{ product.emoji }}</span>
            <span class="product-category">{{ product.category }}</span>
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <div class="product-meta">
              <span class="product-rating" :aria-label="`评分 ${product.rating} 星`">★ {{ product.rating }}</span>
              <span class="product-stock" :class="{ low: product.stock < 30 }">
                {{ product.stock < 30 ? `仅剩${product.stock}件` : '有货' }}
              </span>
            </div>
            <div class="product-bottom">
              <span class="product-price">{{ formatPrice(product.price) }}</span>
              <span class="product-arrow" aria-hidden="true">→</span>
            </div>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { products } from '../data/products'
import { formatPrice } from '../utils/format'
</script>

<style scoped>
.hero {
  position: relative;
  background: linear-gradient(135deg, var(--dark) 0%, var(--dark-light) 100%);
  border-radius: 24px;
  padding: 60px 48px;
  margin-bottom: 48px;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-title {
  font-family: var(--font-display);
  color: white;
  margin-bottom: 12px;
  text-wrap: balance;
}

.hero-line1 {
  display: block;
  font-size: 48px;
  font-weight: 800;
  line-height: 1.2;
  background: linear-gradient(135deg, #fff 0%, var(--orange-light) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-line2 {
  display: block;
  font-size: 36px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
}

.hero-desc {
  color: rgba(255, 255, 255, 0.75);
  font-size: 16px;
  margin-top: 8px;
}

.hero-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.float-emoji {
  position: absolute;
  font-size: 40px;
  left: var(--x);
  top: var(--y);
  opacity: 0.2;
  animation: floatEmoji 4s ease-in-out infinite;
  animation-delay: var(--delay);
}

@keyframes floatEmoji {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(10deg); }
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.section-title {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  text-wrap: balance;
}

.product-count {
  font-size: 14px;
  color: var(--gray);
  background: var(--cream-dark);
  padding: 6px 14px;
  border-radius: 50px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.product-card {
  background: white;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: cardIn 0.5s ease-out both;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-hover);
}

.product-card:hover .product-emoji {
  transform: scale(1.15) rotate(-5deg);
}

.product-card:hover .product-arrow {
  transform: translateX(4px);
  color: var(--orange);
}

@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.product-image {
  height: 160px;
  background: linear-gradient(135deg, var(--cream) 0%, var(--cream-dark) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.product-emoji {
  font-size: 64px;
  transition: transform 0.3s ease;
}

.product-category {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(26, 26, 46, 0.7);
  color: white;
  font-size: 11px;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: 50px;
  backdrop-filter: blur(4px);
}

.product-info {
  padding: 18px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  line-height: 1.3;
}

.product-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.product-rating {
  font-size: 13px;
  color: var(--orange-light);
  font-weight: 600;
}

.product-stock {
  font-size: 12px;
  color: var(--mint);
  font-weight: 500;
}

.product-stock.low {
  color: var(--red);
}

.product-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.product-price {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  color: var(--orange);
  font-variant-numeric: tabular-nums;
}

.product-arrow {
  font-size: 18px;
  color: var(--gray-light);
  transition: all 0.25s ease;
}

@media (max-width: 768px) {
  .hero {
    padding: 40px 24px;
    border-radius: 16px;
  }
  .hero-line1 {
    font-size: 32px;
  }
  .hero-line2 {
    font-size: 24px;
  }
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .product-image {
    height: 120px;
  }
  .product-emoji {
    font-size: 48px;
  }
  .product-info {
    padding: 12px;
  }
  .product-name {
    font-size: 14px;
  }
  .product-price {
    font-size: 18px;
  }
}
</style>
