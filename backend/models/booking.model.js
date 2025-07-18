// models/Booking.js
import mongoose from "mongoose";

// Define the booking schema with consistent naming
const BookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
    index: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200, // Example constraint
  },
  serviceDescription: { // Renamed for consistency
    type: String,
    trim: true,
    maxlength: 1000, // Example constraint
  },
  serviceDate: {
    type: Date,
    required: true,
    index: true,
  },
  preferredTime: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending",
    index: true,
  },
  isDeleted: { // Optional: Soft delete flag
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

// Middleware to ensure referenced documents exist (optional)
BookingSchema.pre('save', async function(next) {
  const User = mongoose.model('User');
  const Vendor = mongoose.model('Vendor');

  try {
    const userExists = await User.findById(this.userId);
    if (!userExists) {
      return next(new Error('User does not exist'));
    }

    const vendorExists = await Vendor.findById(this.vendorId);
    if (!vendorExists) {
      return next(new Error('Vendor does not exist'));
    }

    next();
  } catch (error) {
    next(error);
  }
});

// Composite index for serviceDate and preferredTime
BookingSchema.index({ serviceDate: 1, preferredTime: 1 });

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
