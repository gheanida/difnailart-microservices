<template>
    <div class="login-container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h4>Login</h4>
            </div>
            <div class="card-body">
              <form @submit.prevent="handleLogin">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input v-model="form.email" type="email" class="form-control" required>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input v-model="form.password" type="password" class="form-control" required>
                </div>
                <button type="submit" class="btn btn-primary" :disabled="loading">
                  {{ loading ? 'Logging in...' : 'Login' }}
                </button>
                <router-link to="/register" class="btn btn-link">
                  Don't have an account? Register
                </router-link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'Login',
    data() {
      return {
        form: {
          email: '',
          password: ''
        },
        loading: false,
        error: null
      }
    },
    methods: {
      async handleLogin() {
        this.loading = true
        this.error = null
        
        try {
          // ✅ Akses API user-service untuk login
          const response = await axios.post('http://localhost:3001/auth/login', this.form)
          
          if (response.data.token) {
            // Simpan token di localStorage
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            
            // Redirect ke home
            this.$router.push('/')
          }
        } catch (error) {
          this.error = error.response?.data?.message || 'Login failed. Please try again.'
          alert(this.error)
        } finally {
          this.loading = false
        }
      }
    }
  }
  </script>