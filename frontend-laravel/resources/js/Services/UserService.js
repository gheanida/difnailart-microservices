// resources/js/services/UserService.js
import axios from 'axios';

const userService = axios.create({
  baseURL: process.env.MIX_USER_SERVICE_URL || 'http://localhost:3001',
  timeout: 10000,
});

export default {
  async login(credentials) {
    try {
      // ✅ Coba endpoint yang mungkin
      const endpoints = ['/auth/login', '/api/auth/login', '/users/login', '/api/users/login']
      
      for (const endpoint of endpoints) {
        try {
          const response = await userService.post(endpoint, credentials)
          return response.data
        } catch (e) {
          continue
        }
      }
      
      throw new Error('No valid login endpoint found')
      
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message)
      throw error
    }
  },

  async register(userData) {
    try {
      const endpoints = ['/auth/register', '/api/auth/register', '/users/register', '/api/users/register']
      
      for (const endpoint of endpoints) {
        try {
          const response = await userService.post(endpoint, userData)
          return response.data
        } catch (e) {
          continue
        }
      }
      
      throw new Error('No valid register endpoint found')
      
    } catch (error) {
      console.error('Register error:', error.response?.data || error.message)
      throw error
    }
  }
}