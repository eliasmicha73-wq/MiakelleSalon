import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const videoSrc = `/images/${encodeURI('WhatsApp Video 2026-07-27 at 10.49.47 PM.mp4')}`;

  return (
    <div className="home-page">
      <section className="hero">
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to <span className="gold-text">Miakelle</span> Salon</h1>
          <p>Where beauty meets elegance. Experience luxury treatments tailored just for you.</p>
          <div className="hero-buttons">
            <Link to="/booking" className="btn-primary">Book Now</Link>
            <Link to="/service" className="btn-secondary">Our Services</Link>
          </div>
        </div>
      </section>

      <section className="service-preview">
        <h2 className="section-title">Our Signature Services</h2>
        <p className="section-subtitle">Discover our most loved treatments</p>
        <div className="preview-grid">
          <div className="preview-card">
            <div className="preview-icon">✂️</div>
            <h3>Hair Styling</h3>
            <p>From cuts to coloring, our experts bring your dream look to life</p>
            <Link to="/service?category=hair" className="preview-link">Explore →</Link>
          </div>
          <div className="preview-card">
            <div className="preview-icon">💋</div>
            <h3>Makeup</h3>
            <p>Bridal, evening, or natural looks crafted by professional artists</p>
            <Link to="/service?category=makeup" className="preview-link">Explore →</Link>
          </div>
          <div className="preview-card">
            <div className="preview-icon">✨</div>
            <h3>Waxing</h3>
            <p>Smooth, gentle, and professional hair removal treatments</p>
            <Link to="/service?category=wax" className="preview-link">Explore →</Link>
          </div>
          <div className="preview-card">
            <div className="preview-icon">💅</div>
            <h3>Nails</h3>
            <p>Manicures, pedicures, and stunning nail art designs</p>
            <Link to="/service?category=nails" className="preview-link">Explore →</Link>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-subtitle">Real experiences from our beloved customers</p>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"The best salon experience I've ever had! The staff is professional and the atmosphere is so relaxing."</p>
            <div className="client-info">
              <div className="client-avatar">👩</div>
              <div><h4>Sarah M.</h4><span>Regular Client</span></div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"My bridal makeup was absolutely perfect! I felt like a princess on my special day. Thank you Miakelle!"</p>
            <div className="client-info">
              <div className="client-avatar">👰</div>
              <div><h4>Emma L.</h4><span>Bridal Client</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <h2>Ready to Transform Your Look?</h2>
        <p>Book your appointment today and let our experts bring out your natural beauty</p>
        <div className="cta-buttons">
          <Link to="/booking" className="btn-primary">Book Appointment</Link>
          <Link to="/contact" className="btn-secondary">Contact Us</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;