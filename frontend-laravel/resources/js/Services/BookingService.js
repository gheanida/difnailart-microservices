// resources/js/services/BookingService.js
import axios from 'axios';

const bookingService = axios.create({
  baseURL: process.env.MIX_BOOKING_SERVICE_URL || 'http://localhost:3002',
  timeout: 10000,
});

export default {
  // ✅ GET services (products)
  async getServices() {
    try {
      const response = await bookingService.get('/bookings/services');
      return response.data;
    } catch (error) {
      console.error('Get services error:', error.response?.data || error.message);
      
      // Fallback mock data jika API error
      return [
        { id: 1, name: "Classic Manicure", price: 50000, duration: 45, category: "manicure" },
        { id: 2, name: "Gel Manicure", price: 120000, duration: 60, category: "manicure" },
        { id: 3, name: "Nail Art Design", price: 80000, duration: 75, category: "design" },
        { id: 4, name: "Spa Pedicure", price: 100000, duration: 90, category: "pedicure" }
      ];
    }
  },

  // ✅ CREATE booking (order)
  async createBooking(bookingData, token) {
    try {
      const response = await bookingService.post('/bookings', bookingData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Create booking error:', error.response?.data || error.message);
      throw error;
    }
  },

  // ✅ GET user bookings (orders)
  async getUserBookings(token) {
    try {
      const response = await bookingService.get('/bookings', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Get bookings error:', error.response?.data || error.message);
      
      // Fallback mock data
      return [
        {
          id: 1,
          service_id: 1,
          service_name: "Classic Manicure",
          price: 50000,
          status: "completed",
          booking_date: "2024-01-28T10:00:00Z",
          notes: "Regular appointment"
        }
      ];
    }
  }
};