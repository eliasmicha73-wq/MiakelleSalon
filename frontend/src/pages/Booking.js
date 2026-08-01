import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api";
import "../styles/Booking.css";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { 
    preselectedService, 
    serviceCategory,
    preselectedEmployee,
    employeeDepartment
  } = location.state || {};

  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: preselectedService || '',
    employee: preselectedEmployee || '',
    date: '',
    time: '',
    notes: ''
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (services.length > 0 && employees.length > 0) {
      filterData();
    }
  }, [services, employees, serviceCategory, employeeDepartment]);

  const fetchData = async () => {
    try {
      const [servicesRes, employeesRes] = await Promise.all([
        api.get('/api/services'),   
        api.get('/api/employees')   
      ]);
      setServices(servicesRes.data.data || []);
      setEmployees(employeesRes.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage("Backend data error download.");
    } finally {
      setLoading(false);
    }
  };

  const filterData = () => {
    let finalServices = [...services];
    let finalEmployees = [...employees];

    if (serviceCategory) {
      finalEmployees = employees.filter(emp => emp.department === serviceCategory);
    }
    if (employeeDepartment) {
      finalServices = services.filter(svc => svc.category === employeeDepartment);
    }

    setFilteredServices(finalServices);
    setFilteredEmployees(finalEmployees);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'service') {
      const selectedService = services.find(s => s.id === value);
      if (selectedService) {
        const filteredEmps = employees.filter(emp => emp.department === selectedService.category);
        setFilteredEmployees(filteredEmps);
        if (formData.employee && !filteredEmps.find(emp => emp.id === formData.employee)) {
          setFormData(prev => ({ ...prev, employee: '' }));
        }
      }
    }

    if (name === 'employee') {
      const selectedEmployee = employees.find(emp => emp.id === value);
      if (selectedEmployee) {
        const filteredSvcs = services.filter(svc => svc.category === selectedEmployee.department);
        setFilteredServices(filteredSvcs);
        if (formData.service && !filteredSvcs.find(svc => svc.id === formData.service)) {
          setFormData(prev => ({ ...prev, service: '' }));
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    try {
      await api.post('/api/bookings', formData); 
      setBookingSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Book error ');
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="booking-page">
      <div className="booking-container">
        <div className="booking-header">
          <h1>Book Your Appointment</h1>
          <p>Fill in the details below to schedule your visit</p>
        </div>

        {bookingSuccess && (
          <div className="success-message">
            <h3>✅ Booking Confirmed!</h3>
            <p>Thank you {formData.name}. Your appointment has been booked successfully.</p>
            <p>Redirecting to home page...</p>
          </div>
        )}

        {errorMessage && !bookingSuccess && (
          <div className="error-message">{errorMessage}</div>
        )}

        {!bookingSuccess && (
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label>Your Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label>Select Service *</label>
              <select name="service" value={formData.service} onChange={handleChange} required>
                <option value="">Choose a service</option>
                {filteredServices.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.title} - ${service.price}
                  </option>
                ))}
              </select>
              {(serviceCategory || employeeDepartment) && (
                <small className="form-hint">
                  Showing only {serviceCategory || employeeDepartment} services
                </small>
              )}
            </div>

            <div className="form-group">
              <label>Select Specialist</label>
              <select name="employee" value={formData.employee} onChange={handleChange}>
                <option value="">No preference (Any available specialist)</option>
                {filteredEmployees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.role})
                  </option>
                ))}
              </select>
              {(serviceCategory || employeeDepartment) && (
                <small className="form-hint">
                  Showing only {serviceCategory || employeeDepartment} specialists
                </small>
              )}
            </div>

            
            <div className="form-row">
              <div className="form-group">
                <label>Preferred Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-group">
                <label>Preferred Time *</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Any special requests or details..."
              />
            </div>

            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? "Confirming..." : "Confirm Booking"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Booking;