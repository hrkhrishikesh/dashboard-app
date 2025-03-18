import { useState } from "react";
import { FiUserPlus, FiFilter, FiX, FiEdit, FiTrash2 } from "react-icons/fi";
import DataTable from "../DataTable";
import { users } from "../../data/mockData";

const Users = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [nameFilter, setNameFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
  });
  const [addUserData, setAddUserData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
    joined: "",
    phone: "",
    bio: "",
    gender: "",
  });
  const [addUserErrors, setAddUserErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Apply filters
  const applyFilters = () => {
    let result = [...users];

    if (nameFilter) {
      result = result.filter((user) =>
        user.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (roleFilter) {
      result = result.filter((user) => user.role === roleFilter);
    }

    if (statusFilter) {
      result = result.filter((user) => user.status === statusFilter);
    }

    setFilteredUsers(result);
  };

  // Reset filters
  const resetFilters = () => {
    setNameFilter("");
    setRoleFilter("");
    setStatusFilter("");
    setFilteredUsers(users);
  };

  // Handle edit user
  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setShowEditModal(true);
  };

  // Handle delete user
  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // Handle add user click
  const handleAddUserClick = () => {
    setAddUserData({
      name: "",
      email: "",
      role: "User",
      status: "Active",
      joined: new Date().toISOString().split("T")[0],
      phone: "",
      bio: "",
      gender: "",
    });
    setAddUserErrors({});
    setTouched({});
    setShowAddModal(true);
  };

  // Validate add user form
  const validateAddUserForm = () => {
    const errors = {};

    if (!addUserData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!addUserData.email.trim()) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(addUserData.email)) {
        errors.email = "Invalid email format";
      }
    }

    if (!addUserData.joined) {
      errors.joined = "Joined date is required";
    }

    if (addUserData.phone) {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(addUserData.phone)) {
        errors.phone = "Phone number must be 10 digits";
      }
    }

    if (addUserData.bio && addUserData.bio.length > 500) {
      errors.bio = "Bio cannot exceed 500 characters";
    }

    return errors;
  };

  // Handle add user form change
  const handleAddUserChange = (e) => {
    const { name, value } = e.target;
    setAddUserData({
      ...addUserData,
      [name]: value,
    });
  };

  // Handle add user form blur
  const handleAddUserBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });

    // Validate on blur
    const validationErrors = validateAddUserForm();
    setAddUserErrors(validationErrors);
  };

  // Submit add user form
  const submitAddUserForm = () => {
    const validationErrors = validateAddUserForm();
    setAddUserErrors(validationErrors);

    // If no errors, add the user
    if (Object.keys(validationErrors).length === 0) {
      const newUser = {
        id: Math.max(...filteredUsers.map((user) => user.id)) + 1,
        name: addUserData.name,
        email: addUserData.email,
        role: addUserData.role,
        status: addUserData.status,
        joined: addUserData.joined,
      };

      // Add to users list
      const updatedUsers = [...filteredUsers, newUser];
      setFilteredUsers(updatedUsers);
      setShowAddModal(false);
    }
  };

  // Save edited user
  const saveEditedUser = () => {
   
    const updatedUsers = filteredUsers.map((user) => {
      if (user.id === selectedUser.id) {
        return { ...user, ...editFormData };
      }
      return user;
    });

    setFilteredUsers(updatedUsers);
    setShowEditModal(false);
  };

  // Confirm delete user
  const confirmDelete = () => {
    const updatedUsers = filteredUsers.filter(
      (user) => user.id !== selectedUser.id
    );
    setFilteredUsers(updatedUsers);
    setShowDeleteModal(false);
  };

  // Get error for a field in add user form
  const getAddUserError = (field) => {
    return touched[field] && addUserErrors[field] ? addUserErrors[field] : null;
  };

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
    { key: "joined", label: "Joined Date" },
    {
      key: "actions",
      label: "Actions",
      render: (user) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => handleEdit(user)}
          >
            <FiEdit size={14} />
          </button>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => handleDelete(user)}
          >
            <FiTrash2 size={14} />
          </button>
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
          <button className="btn btn-primary" onClick={handleAddUserClick}>
            <FiUserPlus className="me-2" /> Add User
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="card mb-4 border shadow-sm fade-in">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="card-title mb-0">Filter Users</h5>
              <button
                className="btn btn-sm btn-link text-muted"
                onClick={() => setShowFilters(false)}
              >
                <FiX size={20} />
              </button>
            </div>
            <p className="text-muted small mb-3">
              <i>
                Tip: You can also Click on any column header (Name, Email, Role,
                etc.) to sort the table by that property.
              </i>
            </p>
            <div className="row g-3">
              <div className="col-md-4">
                <label htmlFor="nameFilter" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nameFilter"
                  placeholder="Filter by name..."
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="roleFilter" className="form-label">
                  Role
                </label>
                <select
                  className="form-select"
                  id="roleFilter"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="">All Roles</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="User">User</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="statusFilter" className="form-label">
                  Status
                </label>
                <select
                  className="form-select"
                  id="statusFilter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button
                className="btn btn-outline-secondary me-2"
                onClick={resetFilters}
              >
                Reset
              </button>
              <button className="btn btn-primary" onClick={applyFilters}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="card border shadow-sm">
        <div className="card-body p-0">
          <DataTable data={filteredUsers} columns={columns} itemsPerPage={8} />
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                />
              </div>
              <div className="modal-body">
                <form>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">
                        Full Name*
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          getAddUserError("name") ? "is-invalid" : ""
                        }`}
                        id="name"
                        name="name"
                        value={addUserData.name}
                        onChange={handleAddUserChange}
                        onBlur={handleAddUserBlur}
                        required
                      />
                      {getAddUserError("name") && (
                        <div className="invalid-feedback">
                          {getAddUserError("name")}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">
                        Email*
                      </label>
                      <input
                        type="email"
                        className={`form-control ${
                          getAddUserError("email") ? "is-invalid" : ""
                        }`}
                        id="email"
                        name="email"
                        value={addUserData.email}
                        onChange={handleAddUserChange}
                        onBlur={handleAddUserBlur}
                        required
                      />
                      {getAddUserError("email") && (
                        <div className="invalid-feedback">
                          {getAddUserError("email")}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label htmlFor="role" className="form-label">
                        Role*
                      </label>
                      <select
                        className="form-select"
                        id="role"
                        name="role"
                        value={addUserData.role}
                        onChange={handleAddUserChange}
                      >
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="User">User</option>
                        <option value="Developer">Developer</option>
                        <option value="Designer">Designer</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="status" className="form-label">
                        Status*
                      </label>
                      <select
                        className="form-select"
                        id="status"
                        name="status"
                        value={addUserData.status}
                        onChange={handleAddUserChange}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label htmlFor="joined" className="form-label">
                        Joined Date*
                      </label>
                      <input
                        type="date"
                        className={`form-control ${
                          getAddUserError("joined") ? "is-invalid" : ""
                        }`}
                        id="joined"
                        name="joined"
                        value={addUserData.joined}
                        onChange={handleAddUserChange}
                        onBlur={handleAddUserBlur}
                        required
                      />
                      {getAddUserError("joined") && (
                        <div className="invalid-feedback">
                          {getAddUserError("joined")}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label">
                        Phone (optional)
                      </label>
                      <input
                        type="tel"
                        className={`form-control ${
                          getAddUserError("phone") ? "is-invalid" : ""
                        }`}
                        id="phone"
                        name="phone"
                        value={addUserData.phone}
                        onChange={handleAddUserChange}
                        onBlur={handleAddUserBlur}
                      />
                      {getAddUserError("phone") && (
                        <div className="invalid-feedback">
                          {getAddUserError("phone")}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label htmlFor="gender" className="form-label">
                        Gender (optional)
                      </label>
                      <select
                        className="form-select"
                        id="gender"
                        name="gender"
                        value={addUserData.gender}
                        onChange={handleAddUserChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">
                          Prefer not to say
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="bio" className="form-label">
                      Bio (optional)
                    </label>
                    <textarea
                      className={`form-control ${
                        getAddUserError("bio") ? "is-invalid" : ""
                      }`}
                      id="bio"
                      name="bio"
                      rows="3"
                      value={addUserData.bio}
                      onChange={handleAddUserChange}
                      onBlur={handleAddUserBlur}
                    ></textarea>
                    <div className="form-text text-end">
                      {addUserData.bio.length}/500 characters
                    </div>
                    {getAddUserError("bio") && (
                      <div className="invalid-feedback">
                        {getAddUserError("bio")}
                      </div>
                    )}
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={submitAddUserForm}
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                />
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="editName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editName"
                      value={editFormData.name}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editEmail" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="editEmail"
                      value={editFormData.email}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editRole" className="form-label">
                      Role
                    </label>
                    <select
                      className="form-select"
                      id="editRole"
                      value={editFormData.role}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          role: e.target.value,
                        })
                      }
                    >
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="User">User</option>
                      <option value="Developer">Developer</option>
                      <option value="Designer">Designer</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="editStatus" className="form-label">
                      Status
                    </label>
                    <select
                      className="form-select"
                      id="editStatus"
                      value={editFormData.status}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveEditedUser}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {showDeleteModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                />
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete the user{" "}
                  <strong>{selectedUser?.name}</strong>?
                </p>
                <p className="text-danger">This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Backdrop */}
      {(showEditModal || showDeleteModal || showAddModal) && (
        <div className="modal-backdrop fade show"></div>
      )}
    </div>
  );
};

export default Users;
