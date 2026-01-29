<template>
    <div class="register-container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h4>Register</h4>
            </div>
            <div class="card-body">
              <form @submit.prevent="handleRegister">
                <div class="mb-3">
                  <label for="name" class="form-label">Full Name</label>
                  <input v-model="form.name" type="text" class="form-control" required>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input v-model="form.email" type="email" class="form-control" required>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input v-model="form.password" type="password" class="form-control" required>
                </div>
                <div class="mb-3">
                  <label for="password_confirmation" class="form-label">Confirm Password</label>
                  <input v-model="form.password_confirmation" type="password" class="form-control" required>
                </div>
                <button type="submit" class="btn btn-primary" :disabled="loading">
                  {{ loading ? 'Registering...' : 'Register' }}
                </button>
                <router-link to="/login" class="btn btn-link">
                  Already have an account? Login
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
    name: 'Register',
    data() {
      return {
        form: {
          name: '',
          email: '',
          password: '',
          password_confirmation: ''
        },
        loading: false,
        error: null
      }
    },
    methods: {
      async handleRegister() {
        this.loading = true
        this.error = null
        
        try {
          // ✅ Akses API user-service untuk register
          const response = await axios.post('http://localhost:3001/auth/register', this.form)
          
          if (response.data.token) {
            // Simpan token di localStorage
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            
            // Redirect ke home
            this.$router.push('/')
          }
        } catch (error) {
          this.error = error.response?.data?.message || 'Registration failed. Please try again.'
          alert(this.error)
        } finally {
          this.loading = false
        }
      }
    }
  }
  </script>