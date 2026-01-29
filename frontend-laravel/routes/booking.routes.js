import express from 'express';
import {
  getServices,
  getBookings,
  createBooking
} from '../controllers/booking.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// 🔹 ambil daftar layanan nail art
router.get('/bookings/services', getServices);

// 🔹 ambil booking user (butuh token)
router.get('/bookings', authMiddleware, getBookings);

// 🔹 buat booking baru (butuh token)
router.post('/bookings', authMiddleware, createBooking);

export default router;
