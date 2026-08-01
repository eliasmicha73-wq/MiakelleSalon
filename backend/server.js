const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
      query += ' WHERE category = $1';
      params.push(category);
    }

    query += ' ORDER BY category ASC, id ASC';

    const result = await db.query(query, params);
    const formattedData = result.rows.map(row => ({
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

app.post('/api/services', async (req, res) => {
  try {
    const { title, category, fromPrice, price, duration, sessionPrice, image } = req.body;
    
    if (!title || !category || !fromPrice || !price || !duration || !sessionPrice) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided' });
    }

    const result = await db.query(
      `INSERT INTO services (title, category, from_price, price, duration, session_price, image) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [title, category, fromPrice, price, duration, sessionPrice, image || '']
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'Service added successfully', 
      id: result.rows[0].id 
    });
  } catch (error) {
    console.error("Database Error in POST /api/services:", error); 
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
      query += ' WHERE department = $1';
      params.push(department);
    }
    
    const result = await db.query(query, params);
    const formattedData = result.rows.map(row => ({
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
// 3. Bookings APIs
// ==========================================
app.post('/api/bookings', async (req, res) => {
  try {
    const { name, phone, service, employee, date, time, notes } = req.body;

    if (employee) {
      const existing = await db.query(
        'SELECT * FROM bookings WHERE employee_id = $1 AND booking_date = $2 AND booking_time = $3 AND status != $4',
        [employee, date, time, 'cancelled']
      );
      if (existing.rows.length > 0) {
        return res.status(400).json({ success: false, message: 'This time is booked for this employee. Please select another time.' });
      }
    }

    const result = await db.query(
      `INSERT INTO bookings (customer_name, customer_phone, service_id, employee_id, booking_date, booking_time, notes) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [name, phone, service, employee || null, date, time, notes || '']
    );

    res.status(201).json({ 
      success: true, 
      message: `Your booking has been successfully confirmed ${name}. Thank you!`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while creating the booking' });
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

    const result = await db.query(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, subject, message]
    );

    res.status(201).json({ 
      success: true, 
      message: 'Message saved successfully',
      id: result.rows[0].id 
    });
  } catch (error) {
    console.error("❌ Database Error in POST /api/contact:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// 5. Authentication APIs (مطلوب في Phase 2)
// ==========================================
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const existing = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await db.query(
      'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role',
      [username, email, hashedPassword, 'user']
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'User created successfully',
      user: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'miakelle_super_secret_key_2026',
      { expiresIn: '24h' }
    );
    
    res.json({ 
      success: true, 
      message: 'Login successful',
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ==========================================
// Start Server
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`✅ Connected to PostgreSQL Database on Render`);
});