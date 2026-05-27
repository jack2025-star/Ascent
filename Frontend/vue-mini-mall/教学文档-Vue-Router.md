# Vue Router 教学文档 - 迷你商城案例

本文档配合 Mini Mall 项目代码，讲解 Vue Router 的核心知识点。

---

## 一、路由配置 (src/router/index.js)

### 1.1 创建路由实例

```js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [ ... ],
  scrollBehavior() {
    return { top: 0 }
  }
})
```

- `createWebHistory()` — HTML5 历史模式（无 `#` 号）
- `scrollBehavior` — 路由切换时回到页面顶部

### 1.2 基础路由

```js
{
  path: '/',
  name: 'Home',
  component: () => import('../views/Home.vue')
}
```

- `path` — URL 路径
- `name` — 路由名称，用于 `router.push({ name: 'Home' })`
- `component` — **懒加载**（webpack code splitting）

### 1.3 动态路由 (考点重点)

```js
{
  path: '/product/:id',
  name: 'ProductDetail',
  component: () => import('../views/ProductDetail.vue'),
  props: true
}
```

在组件中获取参数：

```js
import { useRoute } from 'vue-router'

const route = useRoute()
const id = Number(route.params.id)
```

`:id` 是动态片段，`/product/3` 中 `route.params.id === "3"`

### 1.4 路由元信息 + 导航守卫

```js
{
  path: '/profile',
  name: 'Profile',
  component: () => import('../views/Profile.vue'),
  meta: { requiresAuth: true }
}
```

```js
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!authStore.isLoggedIn) {
      next({ name: 'Login', query: { redirect: to.fullPath } })
      return
    }
  }
  next()
})
```

- `meta` — 自定义数据（如权限标记）
- `beforeEach` — **全局前置守卫**，页面跳转前执行
- `query.redirect` — 登录后跳回原来想去的页面

---

## 二、页面跳转方式

### 2.1 声明式导航 (模板中)

```html
<router-link to="/product/1">查看商品</router-link>
<router-link :to="`/product/${product.id}`">{{ product.name }}</router-link>
```

- 渲染为 `<a>` 标签
- `active-class` 自动添加选中样式

### 2.2 编程式导航 (JS 中)

```js
import { useRouter } from 'vue-router'

const router = useRouter()

// 字符串路径
router.push('/cart')

// 命名路由
router.push({ name: 'ProductDetail', params: { id: 3 } })

// 带查询参数
router.push({ name: 'Login', query: { redirect: '/profile' } })

// 后退
router.back()
```

---

## 三、动态路由参数传递

### 方法 1: `useRoute().params`

```js
// ProductDetail.vue
const route = useRoute()
const product = computed(() => {
  return products.find(p => p.id === Number(route.params.id))
})
```

### 方法 2: Props 解耦 (推荐)

```js
// router 配置中开启: props: true
// 组件中直接接收
const props = defineProps({
  id: String
})
```

---

## 四、路由守卫总结

| 守卫 | 作用范围 | 使用场景 |
|------|---------|----------|
| `beforeEach` | 全局 | 登录验证、页面权限 |
| `beforeResolve` | 全局 | 数据预取 |
| `afterEach` | 全局 | 埋点统计 |
| `beforeEnter` | 路由级 | 特定路由权限 |
| `onBeforeRouteLeave` | 组件内 | 离开确认弹窗 |

### 实战：登录守卫

```js
// 未登录访问 /profile → 跳转 /login?redirect=/profile
// 登录成功后跳回 /profile
const redirect = route.query.redirect || '/'
router.push(redirect)
```

---

## 五、页面过渡动画

```html
<router-view v-slot="{ Component }">
  <transition name="page" mode="out-in">
    <component :is="Component" />
  </transition>
</router-view>
```

```css
.page-enter-active {
  animation: pageIn 0.35s ease-out;
}
.page-leave-active {
  animation: pageOut 0.2s ease-in;
}
@keyframes pageIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes pageOut {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-8px); }
}
```

- `mode="out-in"` — 旧页面先退场，新页面再入场

---

## 六、完整路由一览

| 路径 | 页面 | 核心知识点 |
|------|------|-----------|
| `/` | 首页 | `router-link`、商品遍历 |
| `/product/:id` | 商品详情 | **动态路由**、`useRoute().params` |
| `/cart` | 购物车 | 命名路由、Pinia 状态 |
| `/login` | 登录 | 表单、登录态 |
| `/profile` | 个人中心 | **导航守卫**、`meta.requiresAuth` |

---

> 学习中遇到的问题，对照代码和本文档逐行理解，建议动手修改路由参数观察效果。
