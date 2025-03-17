import { useState, useRef } from "react";
import {
  FiSettings,
  FiUser,
  FiLock,
  FiInfo,
  FiBell,
  FiCheck,
} from "react-icons/fi";
import CustomForm from "../CustomForm";
import { useTheme } from "../../context/ThemeContext";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { theme, toggleTheme } = useTheme();
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const formRef = useRef(null);

  // Save changes handler
  const saveChanges = () => {
    if (activeTab === "profile" && formRef.current) {
      // Validate the form using the exposed method from CustomForm
      const result = formRef.current();

      if (result.valid) {
        // No data is being saved - just showing a success message for demo purposes
        setProfileSaved(true);

        // Show success notification
        setShowSaveSuccess(true);

        // Hide notification after 3 seconds
        setTimeout(() => {
          setShowSaveSuccess(false);
        }, 3000);
      }
    }
  };

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Settings</h1>
        <div className="d-flex align-items-center">
          {showSaveSuccess && (
            <div className="alert alert-success py-1 px-3 mb-0 me-3 d-flex align-items-center">
              <FiCheck className="me-2" /> Success
            </div>
          )}
          <button className="btn btn-primary" onClick={saveChanges}>
            <FiSettings className="me-2" /> Save Changes
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3 mb-4 mb-lg-0">
          <div className="card border shadow-sm">
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                <button
                  className={`list-group-item list-group-item-action ${
                    activeTab === "profile" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  <div className="d-flex align-items-center">
                    <FiUser className="me-3" />
                    Profile Information
                  </div>
                </button>
                <button
                  className={`list-group-item list-group-item-action ${
                    activeTab === "account" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("account")}
                >
                  <div className="d-flex align-items-center">
                    <FiLock className="me-3" />
                    Account Security
                  </div>
                </button>
                <button
                  className={`list-group-item list-group-item-action ${
                    activeTab === "notifications" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("notifications")}
                >
                  <div className="d-flex align-items-center">
                    <FiBell className="me-3" />
                    Notifications
                  </div>
                </button>
                <button
                  className={`list-group-item list-group-item-action ${
                    activeTab === "preferences" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("preferences")}
                >
                  <div className="d-flex align-items-center">
                    <FiSettings className="me-3" />
                    Preferences
                  </div>
                </button>
                <button
                  className={`list-group-item list-group-item-action ${
                    activeTab === "about" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("about")}
                >
                  <div className="d-flex align-items-center">
                    <FiInfo className="me-3" />
                    About
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-9">
          <div className="card border shadow-sm">
            <div className="card-body">
              {activeTab === "profile" && (
                <div>
                  <h4 className="card-title mb-4">Profile Information</h4>
                  {profileSaved && (
                    <div className="alert alert-info mb-4">
                      <p className="mb-0">Success</p>
                    </div>
                  )}
                  <CustomForm onSubmit={formRef} />
                </div>
              )}

              {activeTab === "account" && (
                <div>
                  <h4 className="card-title mb-4">Account Security</h4>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="currentPassword" className="form-label">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="currentPassword"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="newPassword" className="form-label">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                      />
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button type="submit" className="btn btn-primary">
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === "notifications" && (
                <div>
                  <h4 className="card-title mb-4">Notification Settings</h4>
                  <div className="mb-3 form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="emailNotifs"
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="emailNotifs">
                      Email Notifications
                    </label>
                  </div>
                  <div className="mb-3 form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="pushNotifs"
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="pushNotifs">
                      Push Notifications
                    </label>
                  </div>
                  <div className="mb-3 form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="smsNotifs"
                    />
                    <label className="form-check-label" htmlFor="smsNotifs">
                      SMS Notifications
                    </label>
                  </div>
                  <div className="mb-3 form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="marketingEmails"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="marketingEmails"
                    >
                      Marketing Emails
                    </label>
                  </div>
                </div>
              )}

              {activeTab === "preferences" && (
                <div>
                  <h4 className="card-title mb-4">Preferences</h4>
                  <div className="mb-4">
                    <label className="form-label">Theme</label>
                    <div className="d-flex align-items-center">
                      <label className="theme-switch me-3">
                        <input
                          type="checkbox"
                          checked={theme === "dark"}
                          onChange={toggleTheme}
                        />
                        <span className="slider"></span>
                      </label>
                      <span>
                        {theme === "dark" ? "Dark Mode" : "Light Mode"}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="language" className="form-label">
                      Language
                    </label>
                    <select className="form-select" id="language">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="ja">Japanese</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="timezone" className="form-label">
                      Timezone
                    </label>
                    <select className="form-select" id="timezone">
                      <option value="utc">UTC</option>
                      <option value="est">Eastern Standard Time (EST)</option>
                      <option value="pst">Pacific Standard Time (PST)</option>
                      <option value="cet">Central European Time (CET)</option>
                      <option value="jst">Japan Standard Time (JST)</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === "about" && (
                <div>
                  <h4 className="card-title mb-4">About</h4>
                  <div className="card mb-3 bg-light">
                    <div className="card-body">
                      <h5 className="card-title">Dashboard App v1.0.0</h5>
                      <p className="card-text">
                        This project was created as a case study for TCS (Tata
                        Consultancy Services).
                      </p>
                      <hr />
                      <p className="card-text mb-0">
                        <strong>Created by:</strong> Hrishikesh Kumar
                      </p>
                      <p className="card-text mb-0">
                        <strong>Email:</strong> kumar.hrishikesh27@gmail.com
                      </p>
                      <p className="card-text mb-0">
                        <strong>Ref No:</strong> DT2020304680497
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5>Core Technologies</h5>
                    <ul className="list-group">
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        React
                        <span className="badge bg-primary rounded-pill">
                          v18.2.0
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Bootstrap
                        <span className="badge bg-primary rounded-pill">
                          v5.3.0
                        </span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        React Router
                        <span className="badge bg-primary rounded-pill">
                          v6.8.1
                        </span>
                      </li>
                    </ul>
                  </div>

                  <p className="text-muted">
                    © {new Date().getFullYear()} Dashboard App. Created for TCS
                    case study evaluation.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
