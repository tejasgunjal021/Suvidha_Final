import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ServiceCategory from './components/ServiceCategory.jsx';
import Footer from './components/Footer';
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

// Import the vendor management pages
import Home from './pages/Home';
import AddVendor from './pages/AddVendor';
// import EditVendor from './pages/EditVendor';
import BookingPage from './pages/BookingPage';
import VendorList from "./components/VendorList";

// Import Auth pages
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignupPage';

// Import user store and loading spinner
import { useUserStore } from "./stores/useUserStore.js";
// import LoadingSpinner from "./components/LoadingSpinner.jsx";
import Spinner from "./pages/Spinner.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import VendorsByCategory from "./components/VendorsByCategory.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import ContactUs from "./pages/ContactUsPage.jsx";
import SearchList from "./components/SearchList.jsx";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();

  const [vendors, setVendors] = useState([]);

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return <Spinner />;
  }

  return (
    <Router>
      <div className="App min-h-screen bg-gray-900 text-white relative overflow-hidden">
        {/* Background gradient */}
       
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(128,0,128,0.3)_0%,rgba(75,0,130,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
      </div>

        {/* Main content */}
        <div className="relative z-50 pt-20">
          <Navbar />
          <Routes>
            {/* Route for the homepage */}
            <Route path="/" element={
              <>
                <Hero handleSearch={setVendors} />
                <ServiceCategory />
                <Services />
                <VendorList />
              </>
            } />

            {/* Routes for vendor management */}
            <Route path="/vendor-management" element={<Home />} />
            <Route path="/add-vendor" element={<AddVendor />} />
            {/* <Route path="/edit-vendor/:id" element={<EditVendor />} /> */}
            <Route path="/vendor/:id" element={<BookingPage />} />
            <Route path="/secret-dashboard" element= {user?.role === "admin" ? <AdminPage /> : <Navigate to='/' />} />

              {/* Profile route for authenticated users */}
            <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to='/' />} />

            <Route path="/services" element={<ServicesPage />} />

            <Route path="/contact-us" element={<ContactUs />} />

            <Route path="/category/:category" element={<VendorsByCategory />} />

            <Route path="/search-vendors" element={<SearchList vendors={vendors} />} />

            {/* Authentication routes */}
            <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
            <Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
          </Routes>

          <Footer />
        </div>

        {/* Toaster notifications */}
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
