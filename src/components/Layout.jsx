import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useTheme } from "../context/ThemeContext";

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const { theme } = useTheme();

  // Handle window resize to detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 992);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Toggle the sidebar on desktop
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Toggle the sidebar on mobile
  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  return (
    <div className={`layout ${theme === "dark" ? "layout-dark" : ""}`}>
      {/* Sidebar for desktop */}
      {!isMobileView && (
        <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      )}

      {/* Sidebar for mobile with animation */}
      {isMobileView && (
        <>
          {showMobileSidebar && (
            <div
              className="mobile-sidebar-backdrop fade-enter-active"
              onClick={toggleMobileSidebar}
            >
              <Sidebar
                isMobile={true}
                toggleMobileSidebar={toggleMobileSidebar}
                collapsed={false}
                toggleSidebar={() => {}}
              />
            </div>
          )}
        </>
      )}

      <div className={`main-content ${sidebarCollapsed ? "expanded" : ""}`}>
        <Navbar toggleMobileSidebar={toggleMobileSidebar} />

        <div className="container-fluid py-4 content-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
