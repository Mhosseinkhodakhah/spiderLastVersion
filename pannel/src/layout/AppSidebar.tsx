import React from 'react';
import { useSidebar } from '../context/SidebarContext';
import { 
  FaWallet, 
  FaExchangeAlt, 
  FaHistory, 
  FaCog,
  FaChartLine,
  FaShieldAlt,
  FaBars
} from 'react-icons/fa';
import { SiCoinbase } from 'react-icons/si';
import { useNavigate } from 'react-router';

const AppSidebar: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen, toggleMobileSidebar } = useSidebar();
  const showText = isExpanded || isHovered;

  const menuItems = [
    { icon: <FaWallet className="text-blue-400" size={20} />, text: 'Wallet', link : '/dashboard'},
    { icon: <FaExchangeAlt className="text-gray-400" size={20} />, text: 'Positions', link : '/positions' },
    { icon: <FaChartLine className="text-gray-400" size={20} />, text: 'chart' , link : '/chart'},
    // { icon: <FaHistory className="text-gray-400" size={20} />, text: 'History', link : '/setting' },
    // { icon: <FaShieldAlt className="text-gray-400" size={20} />, text: 'Security', link : '/setting' },
    { icon: <FaCog className="text-gray-400" size={20} />, text: 'Settings' , link : '/setting'},
  ];
  const navigate = useNavigate();
  return (
    <div className="h-full flex flex-col">
      {/* Sidebar Header with Mobile Close Button */}
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <SiCoinbase className="text-blue-400" size={28} />
          {showText && (
            <span className="text-blue-400 font-bold text-lg">spider crypto bot</span>
          )}
        </div>
        
        {/* Mobile Close Button */}
        {isMobileOpen && (
          <button 
            onClick={toggleMobileSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-800 text-blue-400 transition-colors"
          >
            <FaBars size={16} />
          </button>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                className={`
                  w-full flex items-center space-x-3 p-3 rounded-xl transition-all
                  ${item.active 
                    ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }
                  ${showText ? 'justify-start' : 'justify-center'}
                `}
                onClick={()=>{
                  navigate(`${item.link}`)
                }}
              >
                {item.icon}
                {showText && (
                  <span className="font-medium">{item.text}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className={`flex items-center ${showText ? 'justify-start space-x-3' : 'justify-center'} p-3 rounded-xl bg-gray-800/50`}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">U</span>
          </div>
          {showText && (
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">User Account</p>
              <p className="text-gray-400 text-xs truncate">Connected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;