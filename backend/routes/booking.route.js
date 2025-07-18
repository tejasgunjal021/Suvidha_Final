import express from "express";
import { createBooking, getBookingById, updateBooking, deleteBooking, getUserBookings, fetchVendorBookings, updateBookingStatus } from "../controllers/booking.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/",authenticateUser, createBooking); // Create a new booking
// router.get("/:id", getBookingById); // Get a booking by ID
router.get("/all-bookings",authenticateUser ,getUserBookings);
router.put("/:id", updateBooking); // Update a booking by ID
router.delete("/delete/:id", deleteBooking); // Delete a booking by ID
router.get('/vendor-bookings', authenticateUser, fetchVendorBookings);
router.put(`/:bookingId/status`, updateBookingStatus);



export default router;
