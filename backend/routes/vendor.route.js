import express from "express";
import { upload } from "../config/cloudinary.js";
import {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
  getVendorByUserId,
  getVendorsByCategory,
  searchVendors
} from "../controllers/vendor.controller.js";
import { get } from "mongoose";

const router = express.Router();

// Base route: /vendors

// Create a new vendor with profile and gallery images
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 10 }]), createVendor);


// Update a vendor by ID with optional image and gallery updates
router.put('/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 10 }]), updateVendor);

// Get all vendors
router.get('/', getVendors);

// Get a specific vendor by ID

router.get("/category/:category", getVendorsByCategory);

// router.get('/search' , searchVendors);

router.get('/search/vend', (req, res, next) => {
  console.log('Incoming request params:', req.query);
  next();
}, searchVendors);

router.get('/:id', getVendorById);

// Get a vendor by user ID
router.get('/:userId', getVendorByUserId);

// Delete a vendor by ID
router.delete('/:id', deleteVendor);



export default router;
