// resources/js/store/index.js
import { createStore } from 'vuex'

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    cart: JSON.parse(localStorage.getItem('cart')) || []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    setCart(state, cart) {
      state.cart = cart
      localStorage.setItem('cart', JSON.stringify(cart))
    },
    addToCart(state, product) {
      state.cart.push(product)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    clearCart(state) {
      state.cart = []
      localStorage.removeItem('cart')
    },
    logout(state) {
      state.user = null
      state.token = null
      state.cart = []
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('cart')
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    currentUser: state => state.user,
    cartItems: state => state.cart,
    cartTotal: state => state.cart.reduce((total, item) => total + item.price, 0)
  }
})