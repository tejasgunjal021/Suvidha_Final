import mongoose from "mongoose";
import User from "../models/user.model.js";

// Define the schema
const vendorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",  
  },
  profileImage: {  // Updated field name for consistency
    type: String,
    default: null,  // Default to null if no image provided
  },
  galleryImages: {  // Updated field name for consistency
    type: [String],
    default: [],
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    default: "0",
  },
});

// Create the Vendor model
const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
