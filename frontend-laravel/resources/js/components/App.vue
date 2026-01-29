<template>
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <router-link to="/" class="navbar-brand">
            <i class="fas fa-spa me-2"></i>DifNailart Studio
          </router-link>
          
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <router-link to="/" class="nav-link">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/products" class="nav-link">Services</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/cart" class="nav-link">
                  <i class="fas fa-shopping-cart"></i>
                  Cart ({{ cartItemCount }})
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/orders" class="nav-link">My Orders</router-link>
              </li>
            </ul>
            
            <ul class="navbar-nav">
              <template v-if="isAuthenticated">
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                    <i class="fas fa-user me-1"></i>
                    {{ userName }}
                  </a>
                  <ul class="dropdown-menu">
                    <li><router-link to="/profile" class="dropdown-item">Profile</router-link></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><button @click="logout" class="dropdown-item">Logout</button></li>
                  </ul>
                </li>
              </template>
              <template v-else>
                <li class="nav-item">
                  <router-link to="/login" class="nav-link">Login</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/register" class="btn btn-primary ms-2">Register</router-link>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </nav>
      
      <div class="container mt-4">
        <router-view></router-view>
      </div>
      
      <footer class="mt-5 py-4 bg-dark text-white">
        <div class="container text-center">
          <p>&copy; {{ currentYear }} DifNailart Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
    data() {
      return {
        currentYear: new Date().getFullYear()
      }
    },
    computed: {
      isAuthenticated() {
        return !!localStorage.getItem('token')
      },
      userName() {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        return user.name || 'User'
      },
      cartItemCount() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        return cart.length
      }
    },
    methods: {
      logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('cart')
        this.$router.push('/login')
      }
    }
  }
  </script>
  
  <style>
  .nav-link.router-link-active {
    color: #fff !important;
    font-weight: bold;
  }
  </style>