# Mini Mall - 基于 Vue Router 的迷你商城

## 技术栈

- **Vue 3** (Composition API + `<script setup>`)
- **Vue Router 4** (动态路由、导航守卫)
- **Pinia** (状态管理)
- **Vite** (构建工具)

## 功能

| 路由 | 页面 | 知识点 |
|------|------|--------|
| `/` | 首页 - 商品列表 | 基础路由、`router-link` |
| `/product/:id` | 商品详情 | **动态路由**、`useRoute()` |
| `/cart` | 购物车 | 命名路由、状态管理 |
| `/login` | 登录 | 表单处理、登录态 |
| `/profile` | 个人中心 | **路由守卫**、`beforeEach` |

## 启动

```bash
cd vue-mini-mall
npm install
npm run dev
```

浏览器打开 `http://localhost:3000`

## 构建

```bash
npm run build
npm run preview
```
