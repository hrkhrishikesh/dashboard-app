import React from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, this would handle authentication logic
    // For now, just redirect to home page
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="fade-in p-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card theme-card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">Logout Confirmation</h4>
            </div>
            <div className="card-body p-4 text-center">
              <div className="mb-4">
                <FiLogOut size={50} className="text-primary mb-3" />
                <h5>Are you sure you want to logout?</h5>
                <p className="text-muted">
                  You will be signed out of your account.
                </p>
              </div>
              <div className="d-flex justify-content-center gap-3">
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleLogout}>
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
