import { useState, useEffect } from "react";

const CustomForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dob: "",
    gender: "",
    role: "user",
    bio: "",
    notification: false,
    termsAccepted: false,
  });

  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Validation rules
  const validation = {
    firstName: (value) => (value.trim() ? null : "First name is required"),
    lastName: (value) => (value.trim() ? null : "Last name is required"),
    email: (value) => {
      if (!value.trim()) return "Email is required";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? null : "Invalid email format";
    },
    password: (value) => {
      if (!value) return "Password is required";
      if (value.length < 8) return "Password must be at least 8 characters";
      return null; // Only require 8 characters
    },
    confirmPassword: (value) => {
      if (!value) return "Please confirm your password";
      return value === formData.password ? null : "Passwords do not match";
    },
    phone: (value) => {
      if (!value.trim()) return null; // Optional field
      const phoneRegex = /^\d{10}$/;
      return phoneRegex.test(value) ? null : "Phone number must be 10 digits";
    },
    dob: () => null, // Optional field
    gender: () => null, // Optional field
    role: () => null, // Has default value
    bio: (value) =>
      value.length > 500 ? "Bio cannot exceed 500 characters" : null,
    termsAccepted: (value) =>
      value ? null : "You must accept the terms and conditions",
  };

  // Get error for a field
  const getError = (field) => {
    // Only show error if field is touched or form is submitted
    if (touched[field] || submitted) {
      return validation[field](formData[field]);
    }
    return null;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle input blur
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  // Check if form has errors
  const hasErrors = () => {
    return Object.keys(validation).some((field) =>
      validation[field](formData[field])
    );
  };

  // Validate and get form data
  const validateForm = () => {
    setSubmitted(true);

    if (!hasErrors()) {
      return { valid: true, data: formData };
    } else {
      return { valid: false };
    }
  };

  // Expose validate method to parent via ref
  useEffect(() => {
    if (onSubmit) {
      onSubmit.current = validateForm;
    }
  }, [formData, onSubmit]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      noValidate
      className="needs-validation"
      style={{ maxWidth: "800px" }}
    >
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label">
            First Name*
          </label>
          <input
            type="text"
            className={`form-control ${
              getError("firstName")
                ? "is-invalid"
                : touched.firstName
                ? "is-valid"
                : ""
            }`}
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {getError("firstName") && (
            <div className="invalid-feedback">{getError("firstName")}</div>
          )}
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label">
            Last Name*
          </label>
          <input
            type="text"
            className={`form-control ${
              getError("lastName")
                ? "is-invalid"
                : touched.lastName
                ? "is-valid"
                : ""
            }`}
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {getError("lastName") && (
            <div className="invalid-feedback">{getError("lastName")}</div>
          )}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email*
        </label>
        <input
          type="email"
          className={`form-control ${
            getError("email") ? "is-invalid" : touched.email ? "is-valid" : ""
          }`}
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {getError("email") && (
          <div className="invalid-feedback">{getError("email")}</div>
        )}
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label htmlFor="password" className="form-label">
            Password*
          </label>
          <input
            type="password"
            className={`form-control ${
              getError("password")
                ? "is-invalid"
                : touched.password
                ? "is-valid"
                : ""
            }`}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {getError("password") && (
            <div className="invalid-feedback">{getError("password")}</div>
          )}
        </div>
        <div className="col-md-6">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password*
          </label>
          <input
            type="password"
            className={`form-control ${
              getError("confirmPassword")
                ? "is-invalid"
                : touched.confirmPassword
                ? "is-valid"
                : ""
            }`}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {getError("confirmPassword") && (
            <div className="invalid-feedback">
              {getError("confirmPassword")}
            </div>
          )}
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">
            Phone (optional)
          </label>
          <input
            type="tel"
            className={`form-control ${
              getError("phone")
                ? "is-invalid"
                : touched.phone && formData.phone
                ? "is-valid"
                : ""
            }`}
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {getError("phone") && (
            <div className="invalid-feedback">{getError("phone")}</div>
          )}
        </div>
        <div className="col-md-6">
          <label htmlFor="dob" className="form-label">
            Date of Birth (optional)
          </label>
          <input
            type="date"
            className="form-control"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
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
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="role" className="form-label">
            Role*
          </label>
          <select
            className="form-select"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="bio" className="form-label">
          Bio (optional)
        </label>
        <textarea
          className={`form-control ${getError("bio") ? "is-invalid" : ""}`}
          id="bio"
          name="bio"
          rows="3"
          value={formData.bio}
          onChange={handleChange}
          onBlur={handleBlur}
        ></textarea>
        <div className="form-text text-end">
          {formData.bio.length}/500 characters
        </div>
        {getError("bio") && (
          <div className="invalid-feedback">{getError("bio")}</div>
        )}
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="notification"
          name="notification"
          checked={formData.notification}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="notification">
          Receive email notifications
        </label>
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className={`form-check-input ${
            getError("termsAccepted") ? "is-invalid" : ""
          }`}
          id="termsAccepted"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        <label className="form-check-label" htmlFor="termsAccepted">
          I accept the terms and conditions*
        </label>
        {getError("termsAccepted") && (
          <div className="invalid-feedback">{getError("termsAccepted")}</div>
        )}
      </div>
    </form>
  );
};

export default CustomForm;
