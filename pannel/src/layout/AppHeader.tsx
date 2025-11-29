import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useSidebar } from "../context/SidebarContext";
import { ThemeToggleButton } from "../components/common/ThemeToggleButton";
import { removeCookie } from "../utils/cookie";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { SiCoinbase } from "react-icons/si";
import { MdOutlineLightMode, MdLanguage } from "react-icons/md";

interface AppHeaderProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ darkMode, setDarkMode }) => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 flex w-full bg-gray-900/80 backdrop-blur border-b border-gray-800 z-50">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
          {/* Mobile Menu Toggle */}
          <button
            className="flex items-center justify-center w-10 h-10 text-blue-400 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors z-50 lg:h-11 lg:w-11"
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
          >
            <FaBars size={18} />
          </button>
        
          {/* Logo */}
          <div className="flex items-center space-x-2 lg:hidden">
            <SiCoinbase className="text-blue-400" size={24} />
            <span className="font-bold text-xl text-blue-400">spider crypto bot</span>
          </div>

          {/* Desktop Logo */}
          <div className="hidden lg:flex items-center space-x-2">
            <SiCoinbase className="text-blue-400" size={28} />
            <span className="font-bold text-2xl text-blue-400">spider crypto bot</span>
          </div>

          {/* Mobile Application Menu Toggle */}
          <button
            onClick={toggleApplicationMenu}
            className="flex items-center justify-center w-10 h-10 text-gray-400 rounded-lg hover:bg-gray-800 transition-colors lg:hidden"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        {/* Application Menu */}
        <div
          className={`${
            isApplicationMenuOpen ? "flex" : "hidden"
          } items-center justify-between w-full gap-4 px-5 py-4 lg:flex lg:justify-end lg:px-0 bg-gray-900/50 lg:bg-transparent`}
        >
          <div className="flex items-center gap-3 2xsm:gap-4">
            {/* Theme Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="flex items-center justify-center w-10 h-10 text-blue-400 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <MdOutlineLightMode size={20} />
            </button>

            {/* Language Toggle */}
            <button className="flex items-center justify-center w-10 h-10 text-blue-400 rounded-lg hover:bg-gray-800 transition-colors">
              <MdLanguage size={20} />
            </button>

            {/* Logout Button */}
            <Link
              to="/signin"
              className="flex items-center gap-2 px-4 py-2 font-medium text-gray-300 rounded-lg hover:bg-gray-800 hover:text-red-400 transition-colors"
              onClick={() => { 
                removeCookie("admin-access-token");
                removeCookie("admin-token"); 
              }}
            >
              <FaSignOutAlt className="text-red-400" size={16} />
              <span className="hidden sm:block">خروج</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;