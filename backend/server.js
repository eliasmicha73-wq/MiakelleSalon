const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ==========================================
// 1. Services APIs
// ==========================================

app.get('/api/services', async (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM services';
    let params = [];
    
    if (category && category !== 'all') {
      query += ' WHERE category = ?';
      params.push(category);
    }

    query += ' ORDER BY category ASC, id ASC';

    const [rows] = await db.query(query, params);
    // convert name to be good with Frontend
    const formattedData = rows.map(row => ({
      id: row.id.toString(),
      title: row.title,
      category: row.category,
      fromPrice: row.from_price,
      price: row.price,
      duration: row.duration,
      sessionPrice: row.session_price,
      image: row.image
    }));
    res.json({ success: true, data: formattedData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// Add Service ➕
// ==========================================

app.post('/api/services', async (req, res) => {
  try {
    const { title, category, fromPrice, price, duration, sessionPrice, image } = req.body;
    const [result] = await db.query(
      `INSERT INTO services (title, category, from_price, price, duration, session_price, image) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, category, fromPrice, price, duration, sessionPrice, image || '']
    );
    res.status(201).json({ success: true, message: 'تم إضافة الخدمة بنجاح', id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 2. Employees APIs
// ==========================================

app.get('/api/employees', async (req, res) => {
  try {
    const { department } = req.query;
    let query = 'SELECT * FROM employees';
    let params = [];
    
    if (department) {
      query += ' WHERE department = ?';
      params.push(department);
    }
    
    const [rows] = await db.query(query, params);
    const formattedData = rows.map(row => ({
      id: row.id.toString(),
      name: row.name,
      role: row.role,
      department: row.department,
      specialty: row.specialty,
      experience: row.experience,
      image: row.image
    }));
    res.json({ success: true, data: formattedData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 3.Bookings APIs
// ==========================================

app.post('/api/bookings', async (req, res) => {
  try {
    const { name, phone, service, employee, date, time, notes } = req.body;

    // check time not booking for thr same employees
    if (employee) {
      const [existing] = await db.query(
        'SELECT * FROM bookings WHERE employee_id = ? AND booking_date = ? AND booking_time = ? AND status != "cancelled"',
        [employee, date, time]
      );
      if (existing.length > 0) {
        return res.status(400).json({ success: false, message: 'This time is booked for this employee.Please select another time.' });
      }
    }

    const [result] = await db.query(
      `INSERT INTO bookings (customer_name, customer_phone, service_id, employee_id, booking_date, booking_time, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, phone, service, employee || null, date, time, notes || '']
    );

    res.status(201).json({ 
      success: true, 
      message: `Your booking has been successfully confirmed ${name} . Thank you!`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while crating the booking' });
  }
});

// ==========================================
// 4. Contact APIs
// ==========================================

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

   
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    
    const [result] = await db.query(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );

    res.status(201).json({ 
      success: true, 
      message: 'Message saved successfully',
      id: result.insertId 
    });
  } catch (error) {
    console.error("❌ Database Error in POST /api/contact:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// Add new service ➕  
// ==========================================

app.post('/api/services', async (req, res) => {
  try {
    const { title, category, fromPrice, price, duration, sessionPrice, image } = req.body;
    
    
    if (!title || !category || !fromPrice || !price || !duration || !sessionPrice) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided' });
    }

    const [result] = await db.query(
      `INSERT INTO services (title, category, from_price, price, duration, session_price, image) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, category, fromPrice, price, duration, sessionPrice, image || '']
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'Service added successfully', 
      id: result.insertId 
    });
  } catch (error) {
    console.error("Database Error in POST /api/services:", error); // هذا السطر مهم جداً لمعرفة الخطأ
    res.status(500).json({ success: false, message: error.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`✅ Connected to XAMPP MySQL Database`);
});