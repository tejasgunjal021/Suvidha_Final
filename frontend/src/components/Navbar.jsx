import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  UserPlus,
  LogIn,
  LogOut,
  Lock,
  Briefcase,
  User,
  Menu,
  X,
  Home,
  Settings,
  Mail,
} from "lucide-react";
import { useUserStore } from "../stores/useUserStore.js";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  const isCustomer = user?.role === "customer";
  
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[radial-gradient(ellipse_at_top,rgba(128,0,128,0.5)_0%,rgba(75,0,130,0.4)_50%,rgba(0,0,0,0.3)_100%)] shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Branding and Desktop Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-2xl font-bold text-white">
            Suvidha
          </Link>

          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              to="/"
              className={`flex items-center text-white hover:text-purple-300 transition-colors duration-300 ${
                location.pathname === "/" ? "text-purple-300" : ""
              }`}
            >
              <Home className="mr-1" size={18} />
              Home
            </Link>

            <Link
              to="/services"
              className={`flex items-center text-white hover:text-purple-300 transition-colors duration-300 ${
                location.pathname === "/services" ? "text-purple-300" : ""
              }`}
            >
              <Settings className="mr-1" size={18} />
              Services
            </Link>

            <Link
              to="/contact-us"
              className={`flex items-center text-white hover:text-purple-300 transition-colors duration-300 ${
                location.pathname === "/contact-us" ? "text-purple-300" : ""
              }`}
            >
              <Mail className="mr-1" size={18} />
              Contact Us
            </Link>
          </div>
        </div>

        {/* Menu Toggle for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* User Links */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {isAdmin && (
            <Link
              to="/secret-dashboard"
              className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-md transition-colors duration-300"
            >
              <Lock className="mr-2" size={18} />
              Dashboard
            </Link>
          )}

          {isCustomer && (
            <Link
              to="/add-vendor"
              className="flex items-center text-white hover:text-purple-300 transition-colors duration-300 relative group"
            >
              <Briefcase className="mr-1" size={18} />
              Become a Vendor
            </Link>
          )}

          {user ? (
            <>
              {!isAdmin && (
                <Link
                  to="/profile"
                  className="flex items-center text-white hover:text-purple-300 transition-colors duration-300"
                >
                  <User className="mr-1" size={18} />
                  Profile
                </Link>
              )}

              <button
                onClick={() => {
                  logout();
                }}
                className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-md transition-colors duration-300"
              >
                <LogOut className="mr-2" size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center text-white hover:text-purple-300 transition-colors duration-300"
              >
                <LogIn className="mr-1" size={18} />
                Log In
              </Link>
              <Link
                to="/signup"
                className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-md transition-colors duration-300"
              >
                <UserPlus className="mr-2" size={18} />
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
          aria-hidden="true"
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-28 bg-[radial-gradient(ellipse_at_top,rgba(128,0,128,0.8)_0%,rgba(75,0,130,0.7)_50%,rgba(0,0,0,0.6)_100%)]
 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
        aria-hidden={!isOpen}
      >
        <div className="flex justify-between items-center p-4 border-b border-purple-700">
          <span className="text-xl font-semibold">Menu</span>
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Close Menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col mt-4">
          <Link
            to="/"
            className={`flex flex-col items-center py-4 px-2 hover:bg-purple-700 transition-colors duration-300 ${
              location.pathname === "/" ? "bg-purple-700" : ""
            }`}
            onClick={toggleMenu}
          >
            <Home size={24} />
            <span className="mt-1 text-xs">Home</span>
          </Link>

          <Link
            to="/services"
            className={`flex flex-col items-center py-4 px-2 hover:bg-purple-700 transition-colors duration-300 ${
              location.pathname === "/services" ? "bg-purple-700" : ""
            }`}
            onClick={toggleMenu}
          >
            <Settings size={24} />
            <span className="mt-1 text-xs">Services</span>
          </Link>

          <Link
            to="/contact-us"
            className={`flex flex-col items-center py-4 px-2 hover:bg-purple-700 transition-colors duration-300 ${
              location.pathname === "/contact-us" ? "bg-purple-700" : ""
            }`}
            onClick={toggleMenu}
          >
            <Mail size={24} />
            <span className="mt-1 text-xs">Contact Us</span>
          </Link>

          {isAdmin && (
            <Link
              to="/secret-dashboard"
              className="flex flex-col items-center py-4 px-2 hover:bg-purple-700 transition-colors duration-300"
              onClick={toggleMenu}
            >
              <Lock size={24} />
              <span className="mt-1 text-xs">Dashboard</span>
            </Link>
          )}

          {isCustomer && (
            <Link
              to="/add-vendor"
              className="flex flex-col items-center py-4 px-2 hover:bg-purple-700 transition-colors duration-300"
              onClick={toggleMenu}
            >
              <Briefcase size={24} />
              <span className="mt-1 text-xs">Become Vendor</span>
            </Link>
          )}

          {user ? (
            <>
              {!isAdmin && (
                <Link
                  to="/profile"
                  className="flex flex-col items-center py-4 px-2 hover:bg-purple-700 transition-colors duration-300"
                  onClick={toggleMenu}
                >
                  <User size={24} />
                  <span className="mt-1 text-xs">Profile</span>
                </Link>
              )}

              <button
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
                className="flex flex-col items-center py-4 px-2 hover:bg-purple-700 transition-colors duration-300 w-full text-left"
              >
                <LogOut size={24} />
                <span className="mt-1 text-xs">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex flex-col items-center py-4 px-2 hover:bg-purple-700 transition-colors duration-300"
                onClick={toggleMenu}
              >
                <LogIn size={24} />
                <span className="mt-1 text-xs">Log In</span>
              </Link>
              <Link
                to="/signup"
                className="flex flex-col items-center py-4 px-2 hover:bg-purple-700 transition-colors duration-300"
                onClick={toggleMenu}
              >
                <UserPlus size={24} />
                <span className="mt-1 text-xs">Sign Up</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
