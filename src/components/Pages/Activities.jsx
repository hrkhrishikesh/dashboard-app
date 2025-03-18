import React from "react";
import { FiActivity, FiArrowUp, FiClock } from "react-icons/fi";
import DashboardCard from "../DashboardCard";
import { recentActivities } from "../../data/mockData";

const Activities = () => {
  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">All Activities</h1>
      </div>

      <DashboardCard title="Activity Log" icon={<FiClock />}>
        <div className="list-group list-group-flush">
          {recentActivities.map((activity, index) => {
            let activityIcon;
            let iconBg = "bg-light";

            switch (activity.type) {
              case "create":
                activityIcon = (
                  <FiActivity size={16} className="text-success" />
                );
                iconBg = "bg-success bg-opacity-25";
                break;
              case "upload":
                activityIcon = <FiArrowUp size={16} className="text-primary" />;
                iconBg = "bg-primary bg-opacity-25";
                break;
              case "complete":
                activityIcon = (
                  <FiActivity size={16} className="text-success" />
                );
                iconBg = "bg-success bg-opacity-25";
                break;
              case "delete":
                activityIcon = <FiActivity size={16} className="text-danger" />;
                iconBg = "bg-danger bg-opacity-25";
                break;
              case "update":
                activityIcon = (
                  <FiActivity size={16} className="text-warning" />
                );
                iconBg = "bg-warning bg-opacity-25";
                break;
              case "request":
                activityIcon = <FiActivity size={16} className="text-info" />;
                iconBg = "bg-info bg-opacity-25";
                break;
              default:
                activityIcon = (
                  <FiActivity size={16} className="text-secondary" />
                );
                iconBg = "bg-secondary bg-opacity-25";
            }

            return (
              <div key={index} className="list-group-item px-0">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <div className={`rounded-circle p-2 icon-circle ${iconBg}`}>
                      {activityIcon}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <p className="mb-0">
                      <strong>{activity.user}</strong> {activity.action}
                    </p>
                    <small className="text-muted">{activity.time}</small>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </DashboardCard>
    </div>
  );
};

export default Activities;
