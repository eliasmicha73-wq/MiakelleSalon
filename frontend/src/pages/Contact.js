import { useState } from "react";
import api from "../api";
import "../styles/Contact.css";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await api.post('/api/contact', formData);
      if (response.data.success) {
        setSuccessMessage("✅ Thank you for your message! We'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => { setSuccessMessage(""); }, 4000);
      }
    } catch (error) {
      setErrorMessage("❌ An error occurred. Please try again later.");
      console.error("Contact form error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Get In Touch</h1>
        <p>We'd love to hear from you</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-item">
            <div className="info-icon">📍</div>
            <h3>Visit Us</h3>
            <p>Hamra Street, Beirut, Lebanon</p>
          </div>
          <div className="info-item">
            <div className="info-icon">📞</div>
            <h3>Call Us</h3>
            <p>+961 1 234 567</p>
          </div>
          <div className="info-item">
            <div className="info-icon">✉️</div>
            <h3>Email Us</h3>
            <p>info@miakelle.com</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          {successMessage && <div className="success-message">{successMessage}</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <div className="form-group">
            <label>Your Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} rows="5" required></textarea>
          </div>
          
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;