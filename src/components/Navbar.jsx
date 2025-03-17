import { useState, useEffect } from "react";
import { FiBell, FiUser, FiMenu, FiLogOut } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

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
  }, []);

  const toggleNotifications = () => {
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
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    setShowNotifications(false);
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
          <h4 className="mb-0 d-none d-lg-block">Admin Dashboard</h4>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="position-relative">
            <button
              className="btn btn-link position-relative"
              onClick={toggleNotifications}
            >
              <FiBell size={20} />
              {unreadCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div
                className="dropdown-menu dropdown-menu-end p-0 show fade-in"
                style={{ width: "300px" }}
              >
                <div className="p-2 border-bottom d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">Notifications</h6>
                  <span className="badge bg-primary">
                    {notifications.length}
                  </span>
                </div>
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
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
            )}
          </div>

          <div className="position-relative">
            <button
              className="btn btn-link d-flex align-items-center text-decoration-none"
              onClick={toggleUserMenu}
            >
              <div
                className="rounded-circle bg-primary d-flex justify-content-center align-items-center me-2"
                style={{ width: "32px", height: "32px" }}
              >
                <FiUser size={18} className="text-white" />
              </div>
              <span className="d-none d-md-inline">John Doe</span>
            </button>

            {showUserMenu && (
              <div className="dropdown-menu dropdown-menu-end show fade-in">
                <div className="dropdown-item fw-bold">John Doe</div>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item">Profile</button>
                <button className="dropdown-item">Settings</button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item d-flex align-items-center">
                  <FiLogOut size={16} className="me-2" />
                  Logout
                </button>
              </div>
            )}
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
