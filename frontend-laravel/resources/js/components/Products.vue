<script>
import BookingService from '../services/BookingService'

export default {
  data() {
    return {
      services: [],  
      loading: false,
      error: null
    }
  },
  async mounted() {
    await this.fetchServices()  
  },
  methods: {
    async fetchServices() {
      this.loading = true
      try {

        this.services = await BookingService.getServices()
      } catch (error) {
        this.error = 'Failed to load services'
      } finally {
        this.loading = false
      }
    },
    
    addToCart(service) {

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