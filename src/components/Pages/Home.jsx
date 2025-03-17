import { FiActivity, FiUsers, FiBarChart2, FiClock } from "react-icons/fi";
import DashboardCard from "../DashboardCard";
import StatsCard from "../StatsCard";
import { dashboardStats, recentActivities } from "../../data/mockData";

const Home = () => {
  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Dashboard Overview</h1>
        <div>
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
            <div className="text-center py-5">
              <p className="text-muted mb-0">
                Chart Component will be displayed here
              </p>
              <small>Showing data visualization for user activity</small>
            </div>
          </DashboardCard>

          <DashboardCard title="Server Status" icon={<FiActivity />}>
            <div className="d-flex align-items-center mb-3">
              <div className="me-4">
                <div
                  className="progress"
                  style={{ width: "100px", height: "100px" }}
                >
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: "75%" }}
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    75%
                  </div>
                </div>
              </div>
              <div>
                <h5 className="mb-1">Server Uptime</h5>
                <p className="text-muted mb-0">Last 30 days: 99.8% uptime</p>
              </div>
            </div>

            <div className="row g-2">
              <div className="col-md-6">
                <div className="card bg-light theme-card">
                  <div className="card-body py-2">
                    <div className="d-flex justify-content-between">
                      <div>CPU Usage</div>
                      <div>28%</div>
                    </div>
                    <div className="progress mt-1" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-primary"
                        style={{ width: "28%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card bg-light theme-card">
                  <div className="card-body py-2">
                    <div className="d-flex justify-content-between">
                      <div>Memory Usage</div>
                      <div>42%</div>
                    </div>
                    <div className="progress mt-1" style={{ height: "5px" }}>
                      <div
                        className="progress-bar bg-warning"
                        style={{ width: "42%" }}
                      ></div>
                    </div>
                  </div>
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
              {recentActivities.map((activity, index) => (
                <div key={index} className="list-group-item px-0">
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <div className="bg-light rounded-circle p-2 icon-circle">
                        <FiUsers size={16} />
                      </div>
                    </div>
                    <div>
                      <p className="mb-0">
                        <strong>{activity.user}</strong> {activity.action}
                      </p>
                      <small className="text-muted">{activity.time}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard title="Quick Actions" icon={<FiActivity />}>
            <div className="d-grid gap-2">
              <button className="btn btn-outline-primary">
                <FiUsers className="me-2" /> View All Users
              </button>
              <button className="btn btn-outline-secondary">
                <FiBarChart2 className="me-2" /> Generate Reports
              </button>
              <button className="btn btn-outline-success">
                <FiActivity className="me-2" /> System Status
              </button>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default Home;
