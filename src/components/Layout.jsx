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


  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 992);
    };

 
    handleResize();

    window.addEventListener("resize", handleResize);


    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };


  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  return (
    <div className={`layout ${theme === "dark" ? "layout-dark" : ""}`}>
      {/* Sidebar for desktop */}
      {!isMobileView && (
        <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      )}

      {/* Sidebar for mobile */}
      {isMobileView && showMobileSidebar && (
        <div className="mobile-sidebar-backdrop" onClick={toggleMobileSidebar}>
          <Sidebar
            isMobile={true}
            toggleMobileSidebar={toggleMobileSidebar}
            collapsed={false}
            toggleSidebar={() => {}}
          />
        </div>
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
