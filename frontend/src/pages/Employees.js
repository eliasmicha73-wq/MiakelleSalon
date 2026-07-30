import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Employees.css";

function Employees() {
  const navigate = useNavigate();
  const [employeesData, setEmployeesData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      const employees = response.data.data;


      const grouped = {
        hair: employees.filter(emp => emp.department === 'hair'),
        wax: employees.filter(emp => emp.department === 'wax'),
        makeup: employees.filter(emp => emp.department === 'makeup'),
        nails: employees.filter(emp => emp.department === 'nails')
      };

      setEmployeesData(grouped);
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookEmployee = (employeeId, employeeName, department) => {
    navigate("/booking", { 
      state: { 
        preselectedEmployee: String(employeeId),
        preselectedEmployeeName: employeeName,
        employeeDepartment: department
      } 
    });
  };

  const departmentNames = {
    hair: "Hairdressers",
    wax: "Waxing Specialists",
    makeup: "Makeup Artists",
    nails: "Nail Artists"
  };

  const displayOrder = ['hair', 'makeup', 'wax', 'nails'];


  return (
    <div className="employees-page">
      <div className="employees-header">
        <h1>Our Expert Team</h1>
        <p>Meet the talented professionals behind Miakelle Salon</p>
      </div>

      {displayOrder.map((deptKey) => {
        const members = employeesData[deptKey] || [];
        if (members.length === 0) return null;

        return (
          <div key={deptKey} className="department-section">
            <h2 className="department-title">{departmentNames[deptKey]}</h2>
            
            <div className="employees-grid">
              {members.map(emp => (
                <div key={emp.id} className="employee-card">
                  <div className="employee-image">
                    <img 
                      src={emp.image || 'https://via.placeholder.com/400x300?text=No+Image'} 
                      alt={emp.name}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
                    />
                  </div>
                  <div className="employee-info">
                    <h3>{emp.name}</h3>
                    <p className="role">{emp.role}</p>
                    <p className="specialty">✨ {emp.specialty}</p>
                    <p className="experience">{emp.experience} of experience</p>
                    
                    <button 
                      className="book-employee-btn"
                      onClick={() => handleBookEmployee(emp.id, emp.name, emp.department)}
                    >
                      Book with {emp.name.split(" ")[0]}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Employees;