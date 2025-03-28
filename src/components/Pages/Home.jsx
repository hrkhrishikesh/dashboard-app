import React, { useState } from "react";
import {
  FiUsers,
  FiActivity,
  FiArrowRight,
  FiBarChart2,
  FiClock,
  FiBook,
  FiCalendar,
  FiCheckCircle,
  FiBell,
  FiArrowUp,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import DashboardCard from "../DashboardCard";
import {
  dashboardStats,
  recentActivities,
  tasksData,
  eventsData,
} from "../../data/mockData";
import StatsCard from "../StatsCard";

const Home = () => {
  const [username] = useState("Admin");

  // Only show 3 most recent activities
  const latestActivities = recentActivities.slice(0, 3);

  // Only show 2 most important stats
  const importantStats = dashboardStats.slice(0, 2);

  // Format date to display day and month
  const formatDate = (date) => {
    if (date.toDateString() === new Date().toDateString()) {
      return "Today";
    } else if (
      date.toDateString() ===
      new Date(new Date().setDate(new Date().getDate() + 1)).toDateString()
    ) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div className="fade-in">
      <div className="container-fluid p-0">
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 theme-card welcome-banner bg-primary text-white">
              <div className="card-body p-4">
                <div className="row align-items-center">
                  <div className="col-lg-8">
                    <h1 className="display-6 mb-1">
                      Welcome back, {username}!
                    </h1>
                    <p className="mb-3">
                      Here's what's happening with your dashboard today
                    </p>
                    <Link
                      to="/dashboard"
                      className="btn btn-light text-primary"
                    >
                      Go to Dashboard <FiArrowRight className="ms-1" />
                    </Link>
                  </div>
                  <div className="col-lg-4 d-none d-lg-block text-end">
                    <img
                      src="https://cdn.pixabay.com/photo/2021/12/28/01/07/website-6898411_1280.png"
                      alt="Welcome"
                      className="img-fluid"
                      style={{ maxHeight: "130px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-3 mb-4">
          {importantStats.map((stat, index) => (
            <div key={index} className="col-md-6">
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
          <div className="col-lg-6">
            <DashboardCard
              title="Quick Summary"
              icon={<FiBarChart2 />}
              className="mb-4"
            >
              <div className="p-3">
                <div className="mb-4">
                  <h6 className="mb-3 d-flex align-items-center">
                    <FiCheckCircle className="me-2 text-primary" size={18} />
                    <span>Your Tasks</span>
                  </h6>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <div className="rounded-circle p-2 bg-primary bg-opacity-10">
                          <FiCheckCircle size={16} className="text-primary" />
                        </div>
                      </div>
                      <div>
                        <p className="mb-0">Completed Tasks</p>
                      </div>
                    </div>
                    <h4 className="mb-0">
                      {tasksData.completedTasks}/{tasksData.totalTasks}
                    </h4>
                  </div>
                  <div className="progress" style={{ height: "8px" }}>
                    <div
                      className="progress-bar bg-primary"
                      style={{
                        width: `${
                          (tasksData.completedTasks / tasksData.totalTasks) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="mb-4">
                  <h6 className="mb-3 d-flex align-items-center">
                    <FiCalendar className="me-2 text-primary" size={18} />
                    <span>Upcoming Events</span>
                  </h6>
                  <div className="list-group">
                    {eventsData
                      .sort((a, b) => new Date(a.date) - new Date(b.date))
                      .slice(0, 3)
                      .map((event, index) => {
                        // Set appropriate color based on event type
                        const typeColor =
                          event.type === "meeting"
                            ? "info"
                            : event.type === "deadline"
                            ? "warning"
                            : event.type === "presentation"
                            ? "danger"
                            : "success";

                        return (
                          <div
                            className="list-group-item border-0 px-3 py-2 event-item"
                            key={index}
                          >
                            <div className="d-flex align-items-center">
                              <div className="me-3">
                                <div
                                  className={`event-icon bg-${typeColor} bg-opacity-10`}
                                >
                                  <FiCalendar
                                    size={16}
                                    className={`text-${typeColor}`}
                                  />
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <p className="mb-0 fw-medium">{event.title}</p>
                                <small className="text-muted d-flex align-items-center">
                                  <FiClock size={12} className="me-1" />
                                  {formatDate(event.date)}, {event.time}
                                </small>
                                <p className="mb-0 small text-muted event-description">
                                  {event.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <Link to="/events" className="btn btn-sm btn-outline-primary">
                    View All Events
                  </Link>
                </div>
              </div>
            </DashboardCard>
          </div>

          <div className="col-lg-6">
            <div className="row g-3">
              <div className="col-12">
                <DashboardCard
                  title="Recent Activities"
                  icon={<FiClock />}
                  className="mb-4"
                >
                  <div className="list-group list-group-flush">
                    {latestActivities.map((activity, index) => {
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
                        default:
                          activityIcon = (
                            <FiActivity size={16} className="text-info" />
                          );
                          iconBg = "bg-info bg-opacity-25";
                      }

                      return (
                        <div key={index} className="list-group-item px-0">
                          <div className="d-flex align-items-center">
                            <div className="me-3">
                              <div className={`rounded-circle p-2 ${iconBg}`}>
                                {activityIcon}
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <p className="mb-0">
                                <strong>{activity.user}</strong>{" "}
                                {activity.action}
                              </p>
                              <small className="text-muted">
                                {activity.time}
                              </small>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-center mt-3">
                    <Link
                      to="/dashboard"
                      className="btn btn-sm btn-outline-primary"
                    >
                      View Dashboard
                    </Link>
                  </div>
                </DashboardCard>
              </div>

              <div className="col-12">
                <DashboardCard title="Resources" icon={<FiBook />}>
                  <div className="p-3">
                    <div className="list-group">
                      <a
                        href="#"
                        className="list-group-item list-group-item-action border-0 px-0 py-2"
                      >
                        <div className="d-flex align-items-center">
                          <div className="me-3">
                            <div className="rounded-circle p-2 bg-primary bg-opacity-10">
                              <FiBook size={16} className="text-primary" />
                            </div>
                          </div>
                          <div>
                            <p className="mb-0 fw-medium">User Guide</p>
                            <small className="text-muted">
                              Learn how to use the dashboard
                            </small>
                          </div>
                        </div>
                      </a>
                      <a
                        href="#"
                        className="list-group-item list-group-item-action border-0 px-0 py-2"
                      >
                        <div className="d-flex align-items-center">
                          <div className="me-3">
                            <div className="rounded-circle p-2 bg-success bg-opacity-10">
                              <FiUsers size={16} className="text-success" />
                            </div>
                          </div>
                          <div>
                            <p className="mb-0 fw-medium">Community Forum</p>
                            <small className="text-muted">
                              Connect with other users
                            </small>
                          </div>
                        </div>
                      </a>
                      <a
                        href="#"
                        className="list-group-item list-group-item-action border-0 px-0 py-2"
                      >
                        <div className="d-flex align-items-center">
                          <div className="me-3">
                            <div className="rounded-circle p-2 bg-info bg-opacity-10">
                              <FiBell size={16} className="text-info" />
                            </div>
                          </div>
                          <div>
                            <p className="mb-0 fw-medium">What's New</p>
                            <small className="text-muted">
                              See latest feature updates
                            </small>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </DashboardCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
