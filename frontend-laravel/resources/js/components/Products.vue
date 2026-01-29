<script>
import BookingService from '../services/BookingService'

export default {
  data() {
    return {
      services: [],  // Ganti nama dari products ke services
      loading: false,
      error: null
    }
  },
  async mounted() {
    await this.fetchServices()  // Ganti nama method
  },
  methods: {
    async fetchServices() {
      this.loading = true
      try {
        // ✅ Gunakan endpoint yang benar
        this.services = await BookingService.getServices()
      } catch (error) {
        this.error = 'Failed to load services'
      } finally {
        this.loading = false
      }
    },
    
    addToCart(service) {
      // ... kode addToCart tetap sama
    }
  }
}
</script>

<template>
  <!-- Update template untuk menggunakan services -->
  <div v-for="service in services" :key="service.id">
    <h5>{{ service.name }}</h5>
    <p>Rp {{ service.price.toLocaleString() }}</p>
    <!-- ... -->
  </div>
</template>