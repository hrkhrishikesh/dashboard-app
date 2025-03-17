import React from "react";

const DashboardCard = ({ title, icon, children, className = "" }) => {
  return (
    <div className={`card dashboard-card theme-card ${className}`}>
      {(title || icon) && (
        <div className="card-header bg-transparent d-flex justify-content-between align-items-center">
          {title && <h5 className="card-title mb-0">{title}</h5>}
          {icon && <div className="card-icon">{icon}</div>}
        </div>
      )}
      <div className="card-body">{children}</div>
    </div>
  );
};

export default DashboardCard;
