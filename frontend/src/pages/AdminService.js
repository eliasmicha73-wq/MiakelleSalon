import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/AdminService.css";

function AddService() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    description: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    try {
      await api.post('/api/services', formData);
      navigate('/services');
    } catch (error) {
      console.error('Error adding service:', error);
      setErrorMessage(error.response?.data?.message || "Failed to add new service.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-service-page">
      <h1>Add New Service</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="add-service-form">
        <div className="form-group">
          <label>Service Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g. Haircut & Styling"
          />
        </div>

        <div className="form-group">
          <label>Category *</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder="e.g. Hair, Nails, Skincare"
          />
        </div>

        <div className="form-group">
          <label>Price ($) *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="e.g. 50"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe the service..."
          ></textarea>
        </div>

        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? "Adding..." : "Add Service"}
        </button>
      </form>
    </div>
  );
}

export default AddService;