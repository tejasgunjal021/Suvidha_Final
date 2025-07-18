import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { getVendorById, getUserById } from '../api.js';
import Modal from '../lib/Modal.jsx';
import { useUserStore } from '../stores/useUserStore.js';
import axiosInstance from '../lib/axios.js';

const BookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useUserStore();
    const [vendor, setVendor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [vendorUserInfo, setVendorUserInfo] = useState(null);

    useEffect(() => {
        const fetchVendorData = async () => {
            try {
                const vendorResponse = await getVendorById(id);
                const vendorData = vendorResponse.data;
                setVendor(vendorData);
                const vendorUserId = vendorData.userId;
                const userResponse = await getUserById(vendorUserId);
                setVendorUserInfo(userResponse.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching vendor or user data:", error);
                setError("Failed to load vendor profile.");
                setLoading(false);
            }
        };

        fetchVendorData();
    }, [id]);

    const handleBookService = () => {
        if (!user) {
            toast.error("Please log in to book a service.");
            navigate('/login');
        } else {
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const handleBookingConfirmation = async ({serviceDescription, address, serviceDate, preferredTime}) => {
        try {
            const response = await axiosInstance.post('/bookings', {
                userId: user._id,     // User ID from the authenticated user
                vendorId: id,         // Vendor ID (ensure 'id' is correctly defined in your scope)
                serviceDescription,    // Service description (make sure this is passed from the modal)
                address,               // Address (make sure this is passed from the modal)
                serviceDate: serviceDate, // Service date in the correct format
                preferredTime: preferredTime, // Preferred time
            });
    
            console.log('Booking confirmed:', response.data);
            toast.success('Booking confirmed!');
            setIsModalOpen(false); // Close the modal on success
        } catch (error) {
            console.error('Failed to create booking:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Failed to create booking');
        }
    };
    

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <div className="text-center mt-6 text-red-600">{error}</div>;
    }

    if (!vendor) {
        return <div className="text-center mt-6">Vendor not found</div>;
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center py-8 
                <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(128,0,128,0.3)_0%,rgba(75,0,130,0.2)_45%,rgba(0,0,0,0.1)_100%)]">
            {/* Background Layer */}
            <div className='absolute inset-0'>
                <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(128,0,128,0.3)_0%,rgba(75,0,130,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
            </div>

            <div className="max-w-4xl w-full mx-auto bg-purple-200 shadow-xl rounded-lg p-8 z-10">
                <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">Vendor Profile</h2>

                {/* Vendor Details (Image, Name, Occupation, etc.) */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                    <div className="md:w-1/2 flex flex-col items-center md:items-start mb-4 md:mb-0">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-600 mb-4">
                            <img
                                src={vendor.profileImage}
                                alt="Vendor"
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
                            {vendorUserInfo?.name || "Name not available"}
                        </h2>
                        <p className="text-lg text-gray-700">
                            {vendor.occupation || "Occupation not available"}
                        </p>
                        <p className="text-sm text-gray-500">
                            {vendorUserInfo?.email || "Email not available"}
                        </p>
                    </div>

                    <div className="md:w-1/2 text-center md:text-left md:pl-8">
                        <div className="mb-4">
                            <h3 className="text-xl font-semibold text-purple-600">Location</h3>
                            <p className="text-lg text-gray-700">{vendor.location}</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-purple-600">Category</h3>
                            <p className="text-lg text-gray-700">{vendor.category}</p>
                        </div>
                        {/* Price Section */}
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold text-purple-600">Price</h3>
                            <p className="text-lg text-gray-700">{vendor.price} ₹</p>
                        </div>
                    </div>
                </div>

                {/* Vendor Address */}
                <div className="border-t border-gray-700 pt-6 mt-6">
                    <h3 className="text-2xl font-semibold text-purple-600 mb-3">Address</h3>
                    <p className="text-lg text-gray-700">{vendor.address}</p>
                </div>

                {/* Description Section */}
                <div className="border-t border-gray-700 pt-6 mt-6">
                    <h3 className="text-2xl font-semibold text-purple-600 mb-3">Description</h3>
                    <p className="text-lg text-gray-700">{vendor.description}</p>
                </div>

                {/* Gallery Section */}
                <div className="border-t border-gray-700 pt-6 mt-6">
                    <h3 className="text-2xl font-semibold text-purple-600 mb-3">Gallery</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {vendor.galleryImages && vendor.galleryImages.map((image, index) => (
                            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
                                <img
                                    src={image}
                                    alt={`Gallery Image ${index + 1}`}
                                    className="object-cover w-full h-32 transition-transform duration-200 hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Book Service Button */}
                <div className="mt-6">
                    <button
                        onClick={handleBookService}
                        className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition duration-200"
                    >
                        Book Service
                    </button>
                </div>

                {/* Booking Modal */}
                <Modal
                    isOpen={isModalOpen}
                    closeModal={closeModal}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    handleBookingConfirmation={handleBookingConfirmation}
                />
            </div>
        </div>
    );
};

export default BookingPage;
