import React, { useState } from 'react';
import AuthModal from '../auth/authModal';

const Navbar = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-teal-900 opacity-90">
        <div className="container max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
              <span className="text-gray-200 text-xl font-bold">
                  Run Against The Wind
              </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <button 
                  onClick={() => setIsAuthModalOpen(true)} 
                  className="bg-teal-600 hover:bg-teal-500 text-gray-200 font-medium px-4 py-2 rounded-full text-sm shadow-md transition-all"
                >
                  Sign In
                </button>
              </div>
            </div>
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="text-gray-200 hover:text-white"
                aria-label="Menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* mobile inside hamburger */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-teal-800 px-2 pt-2 pb-3 space-y-1 rounded-b-md">
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="text-gray-200 hover:bg-teal-700 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;