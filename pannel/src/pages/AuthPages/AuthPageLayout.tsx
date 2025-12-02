import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { getCookie } from "../../utils/cookie";
import Loading from "../../components/loading";
import { SiCoinbase } from "react-icons/si";
import { MdOutlineLightMode } from "react-icons/md";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDisplay, setIsDisplay] = React.useState<boolean>(false);
  const [darkMode, setDarkMode] = React.useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = getCookie("admin-token");

    if (cookie) {
      navigate("/", { replace: true });
    } else {
      setIsDisplay(true);
    }
  }, []);

  if (!isDisplay) {
    return <Loading />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-[#0B0E11]" : "bg-gray-50"} transition-colors duration-300`}>
      {/* Navigation Header */}
      <nav className="border-b border-gray-800 backdrop-blur bg-gray-900/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <div className="flex items-center space-x-2">
            <SiCoinbase className="text-blue-400" size={24} />
            <span className="font-bold text-xl text-blue-400">spider crypto bot</span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-2 rounded-lg hover:bg-gray-800 text-blue-400 transition-colors"
            >
              <MdOutlineLightMode size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-73px)]">
        {/* Left Side - Brand Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900/20 to-black/50 backdrop-blur items-center justify-center p-12">
          <div className="relative flex flex-col items-center max-w-md text-center z-10">
            {/* Background Shapes */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>
            
            {/* Logo and Brand Content */}
            <div className="relative mb-8">
              <SiCoinbase className="text-blue-400 mx-auto mb-6" size={64} />
              <h1 className="text-4xl font-bold text-blue-400 mb-4">spider crypto bot</h1>
              <p className="text-gray-400 text-lg mb-6">
                Crypto.com DeFi Extension
              </p>
            </div>

            {/* Features List */}
            <div className="relative space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300">Secure Crypto Management</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300">Multi-Chain Support</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300">Real-time Portfolio Tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300">Advanced Security Features</span>
              </div>
            </div>

            {/* Security Badge */}
            <div className="relative mt-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Enterprise-grade Security</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <div className="bg-gray-900/50 backdrop-blur rounded-2xl border border-gray-800 p-8 shadow-2xl">
              {/* Mobile Logo - Only show on mobile */}
              <div className="lg:hidden text-center mb-8">
                <SiCoinbase className="text-blue-400 mx-auto mb-4" size={48} />
                <h2 className="text-2xl font-bold text-blue-400">spider crypto bot</h2>
                <p className="text-gray-400 text-sm mt-2">Crypto.com Extension</p>
              </div>
              
              {children}
            </div>

            {/* Footer Links */}
            <div className="mt-8 text-center">
              <div className="flex justify-center space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Terms
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Support
                </a>
              </div>
              <p className="text-gray-500 text-xs mt-4">
                © 2024 Crypto.com spider crypto bot. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}