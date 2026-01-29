<script>
import BookingService from '../services/BookingService'

export default {
  methods: {
    async fetchOrders() {
      const token = localStorage.getItem('token')
      
      try {
        // ✅ Gunakan endpoint get bookings yang benar
        this.orders = await BookingService.getUserBookings(token)
      } catch (error) {
        this.error = 'Failed to load bookings'
      }
    }
  }
}
</script>