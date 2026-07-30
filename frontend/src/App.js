import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop"; 
import Home from "./pages/Home";
import Service from "./pages/Service";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Employees from "./pages/Employees";
import AdminService from "./pages/AdminService";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> 
      
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<Service />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/admin-service" element={<AdminService />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;