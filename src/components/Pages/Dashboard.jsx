import {
  FiActivity,
  FiUsers,
  FiBarChart2,
  FiClock,
  FiArrowUp,
  FiArrowDown,
  FiGrid,
  FiList,
} from "react-icons/fi";
import { useState } from "react";
import DashboardCard from "../DashboardCard";
import StatsCard from "../StatsCard";
import {
  dashboardStats,
  recentActivities,
  activityMetrics,
} from "../../data/mockData";

const Dashboard = () => {
  const [view, setView] = useState("standard"); // "standard", "compact", or "detailed"

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-0">Dashboard Overview</h1>
          <p className="text-muted small mb-0">
            Welcome back! Here's your latest data
          </p>
        </div>
        <div className="d-flex gap-2">
          <div className="btn-group me-2">
            <button
              className={`btn btn-sm ${
                view === "standard" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setView("standard")}
            >
              <FiGrid className="me-1" /> Standard
            </button>
            <button
              className={`btn btn-sm ${
                view === "compact" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setView("compact")}
            >
              <FiList className="me-1" /> Compact
            </button>
          </div>
          <button className="btn btn-primary">
            <FiActivity className="me-2" /> Refresh Data
          </button>
        </div>
      </div>

      <div className="row g-3 mb-4">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="col-xl-3 col-md-6">
            <StatsCard
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
            />
          </div>
        ))}
      </div>

      <div className="row g-3">
        <div className="col-lg-8">
          <DashboardCard
            title="Activity Overview"
            icon={<FiBarChart2 />}
            className="mb-4"
          >
            <div className="p-2">
              <div className="row mb-4">
                <div className="col-md-3 col-6 text-center">
                  <h3 className="mb-1 fw-bold">
                    {activityMetrics.dailyActiveUsers.current}
                  </h3>
                  <p className="text-muted small mb-0">Active Users</p>
                  <small className="badge bg-success">
                    <FiArrowUp size={12} className="me-1" />
                    {activityMetrics.dailyActiveUsers.change}%
                  </small>
                </div>
                <div className="col-md-3 col-6 text-center">
                  <h3 className="mb-1 fw-bold">
                    {activityMetrics.sessions.current}
                  </h3>
                  <p className="text-muted small mb-0">Sessions Today</p>
                  <small className="badge bg-success">
                    <FiArrowUp size={12} className="me-1" />
                    {activityMetrics.sessions.change}%
                  </small>
                </div>
                <div className="col-md-3 col-6 text-center">
                  <h3 className="mb-1 fw-bold">
                    {activityMetrics.avgSessionTime.current}
                  </h3>
                  <p className="text-muted small mb-0">Avg Session Time</p>
                  <small className="badge bg-success">
                    <FiArrowUp size={12} className="me-1" />
                    {activityMetrics.avgSessionTime.change}%
                  </small>
                </div>
                <div className="col-md-3 col-6 text-center">
                  <h3 className="mb-1 fw-bold">
                    {activityMetrics.engagementRate.current}%
                  </h3>
                  <p className="text-muted small mb-0">Engagement Rate</p>
                  <small className="badge bg-success">
                    <FiArrowUp size={12} className="me-1" />
                    {activityMetrics.engagementRate.change}%
                  </small>
                </div>
              </div>

              <div className="border-top pt-3 mb-3">
                <h6 className="mb-3">Platform Activity</h6>
                {activityMetrics.platformActivity.map((item, index) => (
                  <div className="mb-3" key={index}>
                    <div className="d-flex justify-content-between mb-1">
                      <span>{item.platform}</span>
                      <span className={`text-${item.color}`}>
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="progress" style={{ height: "8px" }}>
                      <div
                        className={`progress-bar bg-${item.color}`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-top pt-3">
                <h6 className="mb-3">Today's Key Metrics</h6>
                <div className="row">
                  {activityMetrics.keyMetrics
                    .slice(0, 2)
                    .map((metric, index) => (
                      <div className="col-md-6" key={index}>
                        <div className="card bg-light theme-card mb-3">
                          <div className="card-body p-3">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <p className="mb-0 text-muted">{metric.name}</p>
                                <h4 className="mb-0">{metric.value}</h4>
                              </div>
                              <div
                                className={`badge bg-${
                                  metric.change > 0 ? "success" : "danger"
                                }`}
                              >
                                {metric.change > 0 ? (
                                  <FiArrowUp size={12} className="me-1" />
                                ) : (
                                  <FiArrowDown size={12} className="me-1" />
                                )}
                                {Math.abs(metric.change)}%
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="row">
                  {activityMetrics.keyMetrics
                    .slice(2, 4)
                    .map((metric, index) => (
                      <div className="col-md-6" key={index}>
                        <div className="card bg-light theme-card mb-3">
                          <div className="card-body p-3">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <p className="mb-0 text-muted">{metric.name}</p>
                                <h4 className="mb-0">{metric.value}</h4>
                              </div>
                              <div
                                className={`badge bg-${
                                  metric.change > 0
                                    ? metric.trend === "up"
                                      ? "success"
                                      : "danger"
                                    : metric.trend === "up"
                                    ? "danger"
                                    : "success"
                                }`}
                              >
                                {metric.trend === "up" ? (
                                  <FiArrowUp size={12} className="me-1" />
                                ) : (
                                  <FiArrowDown size={12} className="me-1" />
                                )}
                                {Math.abs(metric.change)}%
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>

        <div className="col-lg-4">
          <DashboardCard
            title="Recent Activities"
            icon={<FiClock />}
            className="mb-4"
          >
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
                    activityIcon = (
                      <FiArrowUp size={16} className="text-primary" />
                    );
                    iconBg = "bg-primary bg-opacity-25";
                    break;
                  case "complete":
                    activityIcon = (
                      <FiActivity size={16} className="text-success" />
                    );
                    iconBg = "bg-success bg-opacity-25";
                    break;
                  case "delete":
                    activityIcon = (
                      <FiActivity size={16} className="text-danger" />
                    );
                    iconBg = "bg-danger bg-opacity-25";
                    break;
                  case "update":
                    activityIcon = (
                      <FiActivity size={16} className="text-warning" />
                    );
                    iconBg = "bg-warning bg-opacity-25";
                    break;
                  case "request":
                    activityIcon = (
                      <FiActivity size={16} className="text-info" />
                    );
                    iconBg = "bg-info bg-opacity-25";
                    break;
                  default:
                    activityIcon = <FiUsers size={16} />;
                }

                return (
                  <div key={index} className="list-group-item px-0">
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <div
                          className={`rounded-circle p-2 icon-circle ${iconBg}`}
                        >
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
            <div className="text-center mt-3">
              <button className="btn btn-sm btn-outline-primary">
                View All Activities
              </button>
            </div>
          </DashboardCard>

          <DashboardCard title="Quick Actions" icon={<FiActivity />}>
            <div className="row g-2">
              <div className="col-6">
                <button className="btn btn-outline-primary w-100 p-2">
                  <FiUsers className="d-block mx-auto mb-1" size={18} />
                  <span className="small">Users</span>
                </button>
              </div>
              <div className="col-6">
                <button className="btn btn-outline-secondary w-100 p-2">
                  <FiBarChart2 className="d-block mx-auto mb-1" size={18} />
                  <span className="small">Reports</span>
                </button>
              </div>
              <div className="col-6">
                <button className="btn btn-outline-success w-100 p-2">
                  <FiActivity className="d-block mx-auto mb-1" size={18} />
                  <span className="small">Status</span>
                </button>
              </div>
              <div className="col-6">
                <button className="btn btn-outline-info w-100 p-2">
                  <FiClock className="d-block mx-auto mb-1" size={18} />
                  <span className="small">Activity</span>
                </button>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
