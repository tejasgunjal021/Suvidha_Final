import { UserCircle, List } from "lucide-react"; // Icons for tabs
import { useState } from "react";
import { motion } from "framer-motion";
import UserProfile from "../components/UserProfile"; // Import your MyProfile component

import { useUserStore } from "../stores/useUserStore"; // Import the user store
import BookingList from "../components/BookingList";

const tabs = [
  { id: "profile", label: "My Profile", icon: UserCircle },
  { id: "orders", label: "Orders", icon: List },
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const { user } = useUserStore(); // Retrieve the current user

  if (!user) {
    return <div>Loading user data...</div>; // Handle loading state
  }

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(128,0,128,0.3)_0%,rgba(75,0,130,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          className="text-4xl font-bold mb-8 text-purple-600 text-center" // Changed to purple
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Profile
        </motion.h1>

        <div className="flex justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white" // Active tab color
                  : "bg-gray-700 text-purple-300 hover:bg-purple-500" // Non-active tab color
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Conditional Rendering Based on Active Tab */}
        {activeTab === "profile" && <UserProfile id={user._id} />}
        {activeTab === "orders" && <BookingList  />}
         
      </div>
    </div>
  );
};

export default ProfilePage;
