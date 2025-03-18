import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiUsers,
  FiSettings,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const Sidebar = ({
  collapsed,
  toggleSidebar,
  isMobile,
  toggleMobileSidebar,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  // Define navigation items (removed Analytics and Reports)
  const navItems = [
    { icon: <FiHome size={20} />, text: "Home", path: "/" },
    { icon: <FiGrid size={20} />, text: "Dashboard", path: "/dashboard" },
    { icon: <FiUsers size={20} />, text: "Users", path: "/users" },
    { icon: <FiSettings size={20} />, text: "Settings", path: "/settings" },
  ];

  return (
    <div
      className={`sidebar bg-body-tertiary ${collapsed ? "collapsed" : ""} ${
        isMobile ? "show" : ""
      }`}
    >
      <div className="sidebar-header border-bottom">
        <div
          className={`d-flex align-items-center ${
            collapsed ? "justify-content-center" : ""
          }`}
        >
          {isMobile ? (
            <button
              className={`btn btn-link text-decoration-none p-0 me-3 ${
                isDarkMode ? "text-white" : ""
              }`}
              onClick={toggleMobileSidebar}
              aria-label="Close sidebar"
            >
              <FiX size={24} />
            </button>
          ) : (
            <button
              className={`btn btn-link text-decoration-none p-0 ${
                collapsed ? "" : "me-3"
              } ${isDarkMode ? "text-white" : ""}`}
              onClick={toggleSidebar}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <FiMenu size={24} /> : <FiX size={24} />}
            </button>
          )}
          {!collapsed && (
            <span
              className={`brand-text fw-bold fs-5 ${
                isDarkMode ? "text-white" : ""
              }`}
            >
              Dashboard
            </span>
          )}
        </div>
      </div>

      <div className="sidebar-content p-2">
        <nav className="nav flex-column">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`sidebar-link mb-2 ${isDarkMode ? "text-white" : ""}`}
              onClick={isMobile ? toggleMobileSidebar : undefined}
            >
              <span className="icon">{item.icon}</span>
              <span className="nav-text">{item.text}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-3 border-top">
        <div
          className={`d-flex align-items-center ${
            collapsed ? "justify-content-center" : "justify-content-between"
          }`}
        >
          {!collapsed && (
            <span className={`nav-text ${isDarkMode ? "text-white" : ""}`}>
              Theme
            </span>
          )}
          <label className="theme-switch">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleTheme}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
