// resources/js/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Products from '../components/Products.vue'
import Cart from '../components/Cart.vue'
import Orders from '../components/Orders.vue'

const routes = [
  { 
    path: '/', 
    component: Home,
    name: 'Home'
  },
  { 
    path: '/login', 
    component: Login,
    name: 'Login',
    meta: { guestOnly: true }
  },
  { 
    path: '/register', 
    component: Register,
    name: 'Register',
    meta: { guestOnly: true }
  },
  { 
    path: '/products', 
    component: Products,
    name: 'Products'
  },
  { 
    path: '/cart', 
    component: Cart,
    name: 'Cart',
    meta: { requiresAuth: true }
  },
  { 
    path: '/orders', 
    component: Orders,
    name: 'Orders',
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.guestOnly && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router