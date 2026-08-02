import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/Service.css";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/api/services');
      setServices(response.data.data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      setErrorMessage("Error loading services from backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="services-page">
      <h1>Our Services</h1>
      {loading && <p>Loading services...</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      {!loading && !errorMessage && (
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="price">${service.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Services;