import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"; // Import path module

import { connectDB } from './lib/db.js';
import authRoutes from "./routes/auth.route.js";
import vendorRoutes from "./routes/vendor.route.js";
import bookingRoutes from "./routes/booking.route.js";
import userRoutes from "./routes/user.route.js";
import Vendor from './models/vendor.model.js'; // Import the Vendor model

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cookieParser()); // Parse cookies in request headers
app.use(cors({
  origin: process.env.NODE_ENV === "production" ? "https://suvidha-final.onrender.com" : "http://localhost:5174", // Update for production
  credentials: true, // Allow cookies to be sent
}));

app.use(express.json()); // Parse JSON data in request body

const __dirname = path.resolve();

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/bookings", bookingRoutes);
app.use('/api/users', userRoutes);

// Function to drop the email index on the vendors collection
const dropEmailIndex = async () => {
  try {
    const indexes = await Vendor.collection.indexes(); // Get all indexes for the collection
    const indexName = 'email_1'; // Name of the index you want to drop

    // Check if the index exists
    const indexExists = indexes.some(index => index.name === indexName);
    
    if (indexExists) {
      await Vendor.collection.dropIndex(indexName); // Drop the index if it exists
      console.log('Email index dropped successfully.');
    } else {
      console.log(`Index ${indexName} does not exist. No action taken.`);
    }
  } catch (error) {
    console.error('Error dropping index:', error.message);
  }
};

// Serve static files from the frontend build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist"))); // Serve static files

  // Serve the index.html file for all other requests
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Start the server
app.listen(PORT, async () => {
  await connectDB(); // Connect to the database
  await dropEmailIndex(); // Drop the email index before starting the server
  console.log(`Server is running on port ${PORT}`);
});
