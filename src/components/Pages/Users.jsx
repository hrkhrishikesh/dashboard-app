import { useState } from "react";
import { FiUserPlus, FiFilter, FiDownload } from "react-icons/fi";
import DataTable from "../DataTable";
import { users } from "../../data/mockData";

const Users = () => {
  const [showFilters, setShowFilters] = useState(false);

  // Define columns for the data table
  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    {
      key: "status",
      label: "Status",
      render: (user) => (
        <span
          className={`badge ${
            user.status === "Active" ? "text-bg-success" : "text-bg-secondary"
          }`}
        >
          {user.status}
        </span>
      ),
    },
    { key: "lastLogin", label: "Last Login" },
    { key: "joined", label: "Joined Date" },
    {
      key: "actions",
      label: "Actions",
      render: () => (
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-outline-primary">Edit</button>
          <button className="btn btn-sm btn-outline-danger">Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">User Management</h1>
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-secondary"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter className="me-2" /> Filters
          </button>
          <button className="btn btn-outline-success">
            <FiDownload className="me-2" /> Export
          </button>
          <button className="btn btn-primary">
            <FiUserPlus className="me-2" /> Add User
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="card mb-4 border shadow-sm fade-in">
          <div className="card-body">
            <h5 className="card-title mb-3">Filter Users</h5>
            <div className="row g-3">
              <div className="col-md-4">
                <label htmlFor="roleFilter" className="form-label">
                  Role
                </label>
                <select className="form-select" id="roleFilter">
                  <option value="">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="user">User</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="statusFilter" className="form-label">
                  Status
                </label>
                <select className="form-select" id="statusFilter">
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="dateFilter" className="form-label">
                  Joined Date
                </label>
                <input type="date" className="form-control" id="dateFilter" />
              </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button className="btn btn-outline-secondary me-2">Reset</button>
              <button className="btn btn-primary">Apply Filters</button>
            </div>
          </div>
        </div>
      )}

      <div className="card border shadow-sm">
        <div className="card-body p-0">
          <DataTable data={users} columns={columns} itemsPerPage={8} />
        </div>
      </div>
    </div>
  );
};

export default Users;
