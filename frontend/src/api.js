// src/api.js
import axiosInstance from './lib/axios.js'; // Adjust the import path as necessary

const API_URL = '/vendors'; // Updated to plural form for collections

// Fetch all vendors
export const getVendors = () => axiosInstance.get(`${API_URL}`);

// Fetch a vendor by user ID
export const getVendorByUserId = async (userId) => {
  try {
    const response = await axiosInstance.get(`${API_URL}?userId=${userId}`); // Adjust the endpoint as needed
    return response; // Return the response directly
  } catch (error) {
    console.error('Error fetching vendor by user ID:', error);
    throw error; // Re-throw the error for further handling if needed
  }
};

// Fetch a vendor by ID

export const getVendorById = (id) => axiosInstance.get(`${API_URL}/${id}`);

export const getUserById = (userId) => axiosInstance.get(`/users/${userId}`);

// Fetch a vendor by category
export const fetchVendorsByCategory = async (category) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/category/${category}`); // Correct endpoint
    return response; // Return fetched data
  } catch (error) {
    console.error('Error fetching vendors by category:', error);
    throw error; // Re-throw for error handling
  }
};


// Create a new vendor
export const createVendor = (vendorData) => axiosInstance.post(`${API_URL}`, vendorData);


// Update a vendor by ID
export const updateVendor = (id, vendorData) => axiosInstance.put(`${API_URL}/${id}`, vendorData);

// Delete a vendor by ID
export const deleteVendor = (id) => axiosInstance.delete(`${API_URL}/${id}`);


export const searchVendors = async (location, category) => {
  try {
    console.log("location", location, "category", category);
    const response = await axiosInstance.get(`${API_URL}/search/vend`, {
      params: { location, category },
    });
    console.log('Fetched vendors:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching vendors:', error);
    throw error;
  }
};



