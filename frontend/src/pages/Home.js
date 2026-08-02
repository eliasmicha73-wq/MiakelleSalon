import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const videoSrc = `/images/${encodeURI('WhatsApp Video 2026-07-27 at 10.49.47 PM.mp4')}`;

  return (
    <div className="home-page">
      
      {/* Hero Section */}
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

      {/* Services Preview */}
      <section className="services-preview">
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

      {/* Promo Video Section */}
      <section className="promo-video-section">
        <div className="video-container">
          <div className="video-content">
            <h2>Experience the Miakelle Difference</h2>
            <p>Step into our world of beauty and relaxation. Watch how we transform your look and boost your confidence.</p>
            <Link to="/booking" className="btn-primary">Book Your Visit</Link>
          </div>
          <div className="video-wrapper">
            <video controls className="promo-video">
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>"I've been coming here for 2 years and I'm never disappointed. The nail art is always stunning!"</p>
            <div className="client-info">
              <div className="client-avatar">💁‍♀️</div>
              <div><h4>Layla K.</h4><span>Loyal Client</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Preview - Employees */}
      <section className="team-preview">
        <h2 className="section-title">Meet Our Experts</h2>
        <p className="section-subtitle">Talented professionals dedicated to your beauty</p>
        <div className="team-grid">
          <div className="team-card">
            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400" alt="Sarah Johnson" />
            <h3>Sarah Johnson</h3>
            <p>Senior Hair Stylist</p>
          </div>
          <div className="team-card">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400" alt="Emma Williams" />
            <h3>Emma Williams</h3>
            <p>Pro Makeup Artist</p>
          </div>
          <div className="team-card">
            <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400" alt="Sophia Davis" />
            <h3>Sophia Davis</h3>
            <p>Nail Technician</p>
          </div>
          <div className="team-card">
            <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400" alt="Layla Hassan" />
            <h3>Layla Hassan</h3>
            <p>Waxing Expert</p>
          </div>
        </div>
        <Link to="/employees" className="view-all-btn">View Full Team</Link>
      </section>

      {/* Special Offer - Discount */}
      <section className="special-offer">
        <div className="offer-content">
          <span className="offer-badge">Special Offer</span>
          <h2>Get 20% Off Your First Visit</h2>
          <p>Experience luxury beauty treatments at a special introductory price. Book now and treat yourself!</p>
          <Link to="/booking" className="btn-primary">Claim Your Offer</Link>
        </div>
      </section>

      {/* Final CTA */}
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