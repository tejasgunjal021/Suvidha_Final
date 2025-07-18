import Vendor from "../models/vendor.model.js";
import cloudinary from "cloudinary";


export const createVendor = async (req, res) => {
  const {
    userId, // Get userId from the request body
    address,
    occupation,
    description,
    category,
    location,
    price,
  } = req.body;

  // Validate that userId is present
  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  try {
    // const profileImageUrl = req.file ? req.file.path : null;
     // Single image upload for profile
     console.log("request file",req.file)
     console.log("request files", req.files)
    const profileImageUrl = req.files['image'] ? req.files['image'].map(file => file.path)[0] : null
    const galleryImageUrls = req.files['gallery'] ? req.files['gallery'].map(file => file.path) : []; // Handling multiple gallery images

    // Create a new Vendor instance
    const newVendor = new Vendor({
      userId, // Make sure to include userId
      address,
      occupation,
      description,
      profileImage: profileImageUrl,
      galleryImages: galleryImageUrls,
      category,
      location,
      price
    });

    await newVendor.save();
    res.status(201).json(newVendor);
  } catch (error) {
    console.error('Error creating vendor:', error);
    res.status(500).json({ message: 'Error creating vendor', error: error.message });
  }
};



// Get all vendors
export const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate('userId', 'name email'); // Populate userId with name and email
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single vendor by ID
export const getVendorById = async (req, res) => {
  try {
    console.log("Request Params:", req.params); // Log request parameters
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.status(200).json(vendor);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: error.message });
  }
};

// Get a single vendor by userId
export const getVendorByUserId = async (req, res) => {
  try {
    const { userId } = req.query;  // Expecting userId from query params
    const vendor = await Vendor.findOne({ userId: userId });
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.status(200).json(vendor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// Update vendor by ID
export const updateVendor = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      address: req.body.address,
      occupation: req.body.occupation,
      email: req.body.email,
      description: req.body.description, // Ensure description is included here
      location: req.body.location,       // Ensure location is included here
      category: req.body.category,       // Ensure category is included here
      image: req.body.image,
      gallery: req.body.gallery,
    };

    const vendor = await Vendor.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.status(200).json(vendor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete vendor by ID
export const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getVendorsByCategory = async (req, res) => {
  const { category } = req.params;  // Extract category from request parameters
  try {
    // Find vendors matching the given category
    const vendors = await Vendor.find({ category }).populate('userId', 'name email');

    // Check if any vendors are found for the category
    if (vendors.length === 0) {
      return res.status(404).json({ message: "No vendors found for this category" });
    }

    // Return the vendors if found
    res.status(200).json({vendors});
  } catch (error) {
    console.error("Error in getVendorsByCategory controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const searchVendors = async (req, res) => {
  const { location, category } = req.query;

  try {
    const query = {};
    if (location) query.location = { $regex: location, $options: 'i' }; // Case-insensitive
    if (category) query.category = { $regex: category, $options: 'i' };

    const vendors = await Vendor.find(query).populate('userId', 'name email');
    console.log(vendors);
    res.json(vendors);
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ message: error.message });
  }
};