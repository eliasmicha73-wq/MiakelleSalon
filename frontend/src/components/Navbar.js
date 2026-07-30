import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Miakelle</h1>
        <span className="brand-subtitle">Beauty Salon</span>
      </div>
      <div className="navbar-links">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
        <Link to="/service" className={location.pathname === "/service" ? "active" : ""}>Service</Link>
        <Link to="/booking" className={location.pathname === "/booking" ? "active" : ""}>Booking</Link>
        <Link to="/employees" className={location.pathname === "/employees" ? "active" : ""}>Employees</Link>
        <Link to="/admin-service" className={location.pathname === "/admin-service" ? "active" : ""}>Add Service</Link> {/* إضافة الرابط */}
        <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;