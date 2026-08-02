import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api";
import "../styles/Service.css";

const categories = [
  { id: "all", name: "All Services", icon: "✨" },
  { id: "hair", name: "Hair Styling", icon: "✂️" },
  { id: "makeup", name: "Makeup", icon: "💋" },
  { id: "wax", name: "Wax", icon: "✨" },
  { id: "nails", name: "Nails", icon: "💅" }
];

function Service() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); 

  useEffect(() => {
    fetchServices();
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && ['hair', 'makeup', 'wax', 'nails'].includes(categoryFromUrl)) {
      setActiveCategory(categoryFromUrl);
    } else {
      setActiveCategory("all");
    }
  }, [searchParams]); 

  const fetchServices = async () => {
    try {
      const response = await api.get('/api/service');
      setServices(response.data.data || []);
    } catch (error) {
      console.error('Error fetching service:', error);
    }
  };

  const filteredServices = activeCategory === "all"
    ? services
    : services.filter(s => s.category.trim() === activeCategory.trim());
    
  const handleBookService = (serviceId, serviceName, serviceCategory) => {
    navigate("/booking", { 
      state: { preselectedService: serviceId, preselectedServiceName: serviceName, serviceCategory: serviceCategory } 
    });
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    if (categoryId === 'all') {
      navigate('/service');
    } else {
      navigate(`/service?category=${categoryId}`);
    }
  };

  return (
    <div className="service-page">
      <div className="service-header">
        <h1>Beauty Services</h1>
      </div>

      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={activeCategory === cat.id ? "active" : ""}
            onClick={() => handleCategoryChange(cat.id)} 
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      <div className="services-grid">
        {filteredServices.map(service => (
          <div key={service.id} className="service-card">
            <div className="service-image">
              <img 
                src={service.image.includes('http') ? service.image : `/images/${encodeURI(service.image)}`} 
                alt={service.title} 
              />
            </div>
            <h2 className="service-title">{service.title}</h2>
            <div className="service-pricing">
              <p>From ${service.fromPrice}</p>
              <p>${service.price} / {service.duration}</p>
              <p>${service.sessionPrice} / Session</p>
            </div>
            <button className="book-now-btn" onClick={() => handleBookService(service.id, service.title, service.category)}>
              Book Now
            </button>
          </div>
        ))}
      </div>

      <div className="decorative-bottom">
        <div className="floral-left">🌿</div>
        <div className="floral-center">💖</div>
        <div className="floral-right">🌿</div>
      </div>
    </div>
  );
}

export default Service;