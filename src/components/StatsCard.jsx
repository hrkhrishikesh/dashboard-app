import React from "react";
import {
  FiUsers,
  FiDollarSign,
  FiCheckCircle,
  FiAlertCircle,
  FiActivity,
} from "react-icons/fi";

const StatsCard = ({ title, value, change, icon }) => {
  // Determine if change is positive or negative
  const isPositive = change && change.startsWith("+");

  // Icon mapping
  const iconMap = {
    users: <FiUsers size={24} />,
    wallet: <FiDollarSign size={24} />,
    "check-circle": <FiCheckCircle size={24} />,
    "exclamation-circle": <FiAlertCircle size={24} />,
    activity: <FiActivity size={24} />,
  };

  return (
    <div className="card dashboard-card h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-muted mb-1">{title}</h6>
            <h3 className="mb-0">{value}</h3>
            {change && (
              <span
                className={`badge ${
                  isPositive ? "text-bg-success" : "text-bg-danger"
                } mt-2`}
              >
                {change}
              </span>
            )}
          </div>
          <div className="rounded-circle p-3 bg-light icon-circle">
            {iconMap[icon] || <FiUsers size={24} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
