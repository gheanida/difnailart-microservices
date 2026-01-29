<script>
import BookingService from '../services/BookingService'

export default {
  methods: {
    async placeOrder() {
      const token = localStorage.getItem('token')
      
      const bookingData = {
        service_id: this.cartItems[0]?.id, // Ambil service pertama
        service_name: this.cartItems[0]?.name,
        price: this.totalPrice,
        booking_date: this.appointmentDate + 'T10:00:00Z', // Format ISO
        notes: this.notes,
        status: 'pending'
      }
      
      try {
        // ✅ Gunakan endpoint create booking yang benar
        const booking = await BookingService.createBooking(bookingData, token)
        
        localStorage.removeItem('cart')
        alert(`Booking #${booking.id} created successfully!`)
        this.$router.push('/orders')
        
      } catch (error) {
        alert('Failed to create booking: ' + (error.response?.data?.message || error.message))
      }
    }
  }
}
</script>