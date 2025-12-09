import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet, useNavigate } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { getCookie } from "../utils/cookie";
import { useEffect, useState } from "react";
import Loading from "../components/loading";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const [isDisplay, setIsDisplay] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = getCookie("admin-token");
    
    if (cookie) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/signin", { replace: true });
    }
    setIsDisplay(true);
  }, []);

  if (!isDisplay) {
    return <Loading />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-[#0B0E11] text-white" : "bg-white text-gray-900"} transition-colors duration-300`}>
      {/* Main Content Area */}
      <div className="flex h-screen">
        {/* Sidebar - Fixed for mobile, static for desktop */}
        <div className={`
          fixed inset-y-0 left-0 z-40 transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isExpanded || isHovered ? 'w-64' : 'w-20'}
          bg-gray-900/95 backdrop-blur border-r border-gray-800 h-full
        `}>
          <AppSidebar />
        </div>

        {/* Backdrop for mobile sidebar */}
        {isMobileOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden">
            <Backdrop />
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-full overflow-hidden">
          {/* Header */}
          <AppHeader darkMode={darkMode} setDarkMode={setDarkMode} />
          
          {/* Main Content */}
          <div className={`
            flex-1 transition-all duration-300 ease-in-out
            overflow-auto
            ${(isExpanded || isHovered) ? 'lg:ml-0' : 'lg:ml-0'}
          `}>
            <div className="p-4 md:p-6 h-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;