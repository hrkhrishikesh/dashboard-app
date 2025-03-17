import { useState, useEffect } from "react";
import { FiBell, FiUser, FiMenu, FiLogOut, FiSettings } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";

const Navbar = ({ toggleMobileSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Load notifications from localStorage or fall back to mock data
  useEffect(() => {
    // Try to get notifications from localStorage
    const storedNotifications = localStorage.getItem("notifications");

    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    } else {
      // If not in localStorage, use the imported mock data
      import("../data/mockData").then(
        ({ notifications: mockNotifications }) => {
          setNotifications(mockNotifications);
          // Save to localStorage for future use
          localStorage.setItem(
            "notifications",
            JSON.stringify(mockNotifications)
          );
        }
      );
    }

    // Add global click handler to close dropdowns
    const handleGlobalClick = (event) => {
      // Check if click is inside any dropdown or toggle button
      const isNotificationToggle = event.target.closest(".notification-toggle");
      const isNotificationDropdown = event.target.closest(
        ".notification-dropdown"
      );
      const isUserMenuToggle = event.target.closest(".user-menu-toggle");
      const isUserMenuDropdown = event.target.closest(".user-menu-dropdown");

      // Close notifications if clicked outside
      if (
        !isNotificationToggle &&
        !isNotificationDropdown &&
        showNotifications
      ) {
        setShowNotifications(false);
      }

      // Close user menu if clicked outside
      if (!isUserMenuToggle && !isUserMenuDropdown && showUserMenu) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("click", handleGlobalClick);

    // Clean up
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [showNotifications, showUserMenu]);

  const toggleNotifications = (e) => {
    e.stopPropagation();

    if (!showNotifications) {
      // Mark all notifications as read when opening the panel
      const updatedNotifications = notifications.map((notification) => ({
        ...notification,
        read: true,
      }));

      setNotifications(updatedNotifications);
      // Update localStorage
      localStorage.setItem(
        "notifications",
        JSON.stringify(updatedNotifications)
      );
    }

    setShowNotifications(!showNotifications);
    setShowUserMenu(false); // Close user menu when opening notifications
  };

  const toggleUserMenu = (e) => {
    e.stopPropagation();
    setShowUserMenu(!showUserMenu);
    setShowNotifications(false); // Close notifications when opening user menu
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom sticky-top">
      <div className="container-fluid">
        <button
          className="btn btn-link d-lg-none"
          onClick={toggleMobileSidebar}
        >
          <FiMenu size={24} />
        </button>

        <div className="d-flex">
          <h4 className="mb-0 d-none d-lg-block">TCS Dashboard</h4>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="dropdown">
            <button
              className="btn btn-link position-relative notification-toggle"
              onClick={toggleNotifications}
            >
              <FiBell size={20} />
              {unreadCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {unreadCount}
                </span>
              )}
            </button>

            <div
              className={`dropdown-menu notification-dropdown p-0 ${
                showNotifications ? "show" : ""
              }`}
              style={{ width: "300px" }}
            >
              <div className="p-2 border-bottom d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Notifications</h6>
                <span className="badge bg-primary">{notifications.length}</span>
              </div>
              <div
                className="notification-scroll"
                style={{ maxHeight: "300px", overflowY: "auto" }}
              >
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`dropdown-item p-2 border-bottom notification-item ${
                      !notification.read ? "unread" : ""
                    }`}
                  >
                    <p className="mb-0 fw-semibold">{notification.message}</p>
                    <small className="text-muted">{notification.time}</small>
                  </div>
                ))}
              </div>
              <div className="p-2 text-center border-top">
                <button className="btn btn-sm btn-primary">View All</button>
              </div>
            </div>
          </div>

          <div className="dropdown">
            <button
              className="btn btn-link d-flex align-items-center text-decoration-none user-menu-toggle"
              onClick={toggleUserMenu}
            >
              <div
                className="rounded-circle bg-primary d-flex justify-content-center align-items-center me-2"
                style={{ width: "32px", height: "32px" }}
              >
                <FiUser size={18} className="text-white" />
              </div>
              <span className="d-none d-md-inline">Admin</span>
            </button>

            <div
              className={`dropdown-menu user-menu-dropdown ${
                showUserMenu ? "show" : ""
              }`}
            >
              <div className="dropdown-item fw-bold">Admin</div>
              <div className="dropdown-divider"></div>
              <Link
                to="/settings"
                className="dropdown-item d-flex align-items-center"
                onClick={() => setShowUserMenu(false)}
              >
                <FiSettings size={16} className="me-2" />
                Settings
              </Link>
              <div className="dropdown-divider"></div>
              <Link
                to="/logout"
                className="dropdown-item d-flex align-items-center"
                onClick={() => setShowUserMenu(false)}
              >
                <FiLogOut size={16} className="me-2" />
                Logout
              </Link>
            </div>
          </div>

          <div className="d-none d-md-block">
            <label className="theme-switch">
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={toggleTheme}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
