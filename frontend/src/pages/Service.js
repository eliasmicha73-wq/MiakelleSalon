import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api";
import "../styles/Service.css";

const categories = [
  { id: "all", name: "All Service", icon: "✨" },
  { id: "hair", name: "Hair Styling", icon: "✂️" },
  { id: "makeup", name: "Makeup", icon: "💋" },
  { id: "wax", name: "Wax", icon: "✨" },
  { id: "nails", name: "Nails", icon: "💅" }
];

function Service() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [service, setService] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); 

  useEffect(() => {
    fetchService();
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && ['hair', 'makeup', 'wax', 'nails'].includes(categoryFromUrl)) {
      setActiveCategory(categoryFromUrl);
    } else {
      setActiveCategory("all");
    }
  }, [searchParams]); 

const fetchService = async () => {
  try {
    const API_URL = process.env.REACT_APP_API_URL || 'https://miakelle-salon-backend.onrender.com/api';
    console.log('🔄 Trying to fetch from:', API_URL + '/service');
    
    const response = await fetch(API_URL + '/service');
    const data = await response.json();
    
    console.log('✅ Response received:', data);
    
    if (data.success) {
      setService(data.data || []);
    } else {
      console.error('❌ API returned success: false');
    }
  } catch (error) {
    console.error('❌ Fetch error:', error);
  }
};

  const filteredService = activeCategory === "all"
    ? service
    : service.filter(s => s.category.trim() === activeCategory.trim());
    
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

      <div className="service-grid">
        {filteredService.map(service => (
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