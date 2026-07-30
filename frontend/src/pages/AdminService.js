import { useState } from "react";
import axios from "axios";
import "../styles/AdminService.css";

function AdminService() {
  const [formData, setFormData] = useState({
    title: "",
    category: "hair",
    fromPrice: "",
    price: "",
    duration: "",
    sessionPrice: "",
    image: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post('http://localhost:5000/api/services', formData);
      
      if (response.data.success) {
        setSuccessMessage("✅ Service added successfully!");
        setFormData({
          title: "",
          category: "hair",
          fromPrice: "",
          price: "",
          duration: "",
          sessionPrice: "",
          image: ""
        });
        
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
    } catch (error) {
      setMessage("❌ An error occurred while adding the service. Check backend console.");
      console.error("Frontend Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Add New Service</h1>
          <p>Add a new beauty service to the database</p>
        </div>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        {message && <div className="error-message">{message}</div>}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Service Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Bridal Hair Styling"
              required
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="hair">Hair Styling</option>
              <option value="makeup">Makeup</option>
              <option value="wax">Wax</option>
              <option value="nails">Nails</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>From Price ($) *</label>
              <input
                type="number"
                name="fromPrice"
                value={formData.fromPrice}
                onChange={handleChange}
                placeholder="50"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Full Price ($) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="80"
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Duration *</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 45min"
                required
              />
            </div>

            <div className="form-group">
              <label>Session Price ($) *</label>
              <input
                type="number"
                name="sessionPrice"
                value={formData.sessionPrice}
                onChange={handleChange}
                placeholder="50"
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Image URL (optional)</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
            <small>Leave empty for default image</small>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Adding Service..." : "Add Service"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminService;