--  Creating the database
CREATE DATABASE IF NOT EXISTS miakelle_salon;
USE miakelle_salon;

-- ============================================
-- Users Table For Authentication 
-- ============================================
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Deleting old tables,if any ...
DROP TABLE IF EXISTS contact_messages;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS services;

-- ============================================
-- 1. Services Table 
-- ============================================
CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    category ENUM('hair', 'makeup', 'wax', 'nails') NOT NULL,
    from_price DECIMAL(10, 2) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    session_price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255) DEFAULT ''
);

-- ============================================
-- 2. Employees Table
-- ============================================
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    department ENUM('hair', 'wax', 'makeup', 'nails') NOT NULL,
    specialty VARCHAR(200),
    experience VARCHAR(100),
    image VARCHAR(255) DEFAULT ''
);

-- ============================================
-- 3. Bookings Table
-- ============================================
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    customer_email VARCHAR(100),
    service_id INT,
    employee_id INT,
    booking_date DATE NOT NULL,
    booking_time VARCHAR(20) NOT NULL,
    notes TEXT,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE SET NULL
);

-- ============================================
-- 4. Contact Messages Table
-- ============================================
CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Initial Service Data Entry (28 services)
-- ============================================
INSERT INTO services (title, category, from_price, price, duration, session_price, image) VALUES
-- Hair Styling (10 services)
('Brushing', 'hair', 50, 80, '30min', 50, 'WhatsApp Image 2026-07-27 at 11.02.44 PM.jpeg'),
('Wavy', 'hair', 70, 100, '45min', 70, 'WhatsApp Image 2026-07-27 at 11.02.19 PM.jpeg'),
('Haircut', 'hair', 100, 150, '45min', 100, 'WhatsApp Image 2026-07-27 at 9.41.55 PM.jpeg'),
('Hair Color', 'hair', 150, 250, '90min', 150, 'WhatsApp Image 2026-07-27 at 9.38.54 PM (1).jpeg'),
('Highlight', 'hair', 200, 350, '120min', 200, 'WhatsApp Image 2026-07-27 at 9.41.17 PM.jpeg'),
('Lowlight', 'hair', 180, 300, '90min', 180, 'WhatsApp Image 2026-07-27 at 9.44.53 PM.jpeg'),
('Defrizzage', 'hair', 180, 300, '120min', 180, 'WhatsApp Image 2026-07-27 at 9.41.59 PM.jpeg'),
('Hair Bun', 'hair', 80, 120, '40min', 80, 'WhatsApp Image 2026-07-27 at 9.41.52 PM.jpeg'),
('Half-up Hair', 'hair', 90, 140, '45min', 90, 'WhatsApp Image 2026-07-27 at 9.41.57 PM.jpeg'),
('Bride Hair', 'hair', 300, 500, '120min', 300, 'https://th.bing.com/th/id/OIP.J6IWq29KB0vHGjQJkf0XtQHaJ4?w=208&h=277&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'),

-- Makeup (4 services)
('Bridal Makeup', 'makeup', 400, 600, '120min', 400, 'https://tse3.mm.bing.net/th/id/OIP.cDr2qLGj8Y3uw35B8tvNSAHaLH?r=0&pid=ImgDet&w=184&h=276&c=7&dpr=1.3&o=7&rm=3'),
('Simple Makeup', 'makeup', 150, 200, '45min', 150, 'WhatsApp Image 2026-07-27 at 9.41.51 PM.jpeg'),
('Heavy Makeup', 'makeup', 250, 350, '90min', 250, 'WhatsApp Image 2026-07-27 at 9.41.58 PM.jpeg'),
('Sad Makeup', 'makeup', 200, 300, '60min', 200, 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1YP08V.img?w=1200&h=624&m=4&q=99'),

-- Wax (8 services)
('Wax Arms', 'wax', 80, 120, '30min', 80, 'https://tse1.mm.bing.net/th/id/OIP.lBQ479DTqcWF2phj4IlYWAHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'),
('Under Arms', 'wax', 60, 90, '20min', 60, 'https://th.bing.com/th/id/R.d4e11caf8af2c453b8ddffea28668386?rik=cMTzqKYK9cluaQ&riu=http%3a%2f%2friseandshinesalon.com%2fcdn%2fshop%2ffiles%2f20241006-094616_0000.png%3fv%3d1728225987&ehk=ZC4bT0PJnxRwPwT8%2fs7JrWnJGrxbI0BbTkJfI2mxTNU%3d&risl=&pid=ImgRaw&r=0'),
('Leg Waxing', 'wax', 100, 150, '45min', 100, 'https://tse2.mm.bing.net/th/id/OIP.SwJcLviXlXkodkCDuxHhkAHaE8?r=0&w=780&h=520&rs=1&pid=ImgDetMain&o=7&rm=3'),
('Face Waxing', 'wax', 50, 80, '20min', 50, 'https://tse3.mm.bing.net/th/id/OIP.bWBzbRtW3cb58g_0a1pyLQHaD4?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'),
('Eyebrow Waxing', 'wax', 40, 60, '15min', 40, 'https://tse4.mm.bing.net/th/id/OIP.yRnMcp6V9WlIjiMAn0LavQHaF_?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'),
('Stomach Waxing', 'wax', 70, 100, '30min', 70, 'https://tse3.mm.bing.net/th/id/OIP.elJq7MDK5cnl5AirXqagvgAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'),
('Back Waxing', 'wax', 90, 130, '40min', 90, 'https://tresswellness.com/cdn/shop/articles/Article_Banner_7297aabd-67ef-4120-bf26-bb3dc76e9809.jpg?crop=center&height=630&v=1746085508&width=1200'),
('Bridal Wax', 'wax', 250, 400, '90min', 250, 'https://tse3.mm.bing.net/th/id/OIP.sJzMlaHSCqiGRe_eQpmvTwHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'),

-- Nails (6 services)
('Manicure', 'nails', 80, 120, '45min', 80, 'https://tse1.mm.bing.net/th/id/OIP.5b15YgeyYvBt_Pz2qfz0KAHaJ7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'),
('Pedicure', 'nails', 90, 130, '50min', 90, 'https://tse1.mm.bing.net/th/id/OIP.BfAJo7uPVOg_sh-wHahM1QHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'),
('Gel', 'nails', 120, 180, '60min', 120, 'https://tse1.mm.bing.net/th/id/OIP.l-Iju5D3yuxg0tHqTJ7CVwAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'),
('Gelish', 'nails', 130, 190, '60min', 130, 'https://i.pinimg.com/736x/40/47/ac/4047acee794b58948cd98993da6ccb14.jpg'),
('Nail Extensions', 'nails', 150, 250, '90min', 150, 'https://nailtrail.com/wp-content/uploads/2026/04/Hand_wearing_white_202604182316.jpeg'),
('Bridal Nail', 'nails', 200, 300, '90min', 200, 'https://tse2.mm.bing.net/th/id/OIP.wFuayiCbiQPUwSmiYaOQ1AHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3');

-- ============================================
-- Entring employee data (16 employees)
-- ============================================
INSERT INTO employees (name, role, department, specialty, experience, image) VALUES
-- Hairdressers (4)
('Sarah Johnson', 'Senior Hair Stylist', 'hair', 'Coloring & Styling', '8 years', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400'),
('Chloe Martin', 'Hair Colorist', 'hair', 'Balayage & Highlights', '5 years', 'https://tse3.mm.bing.net/th/id/OIP.LL0A5U6uLR_BFknygibxnAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'),
('Jessica Martinez', 'Hair Stylist', 'hair', 'Cut & Blow Dry', '5 years', 'https://static.vecteezy.com/system/resources/previews/029/562/877/large_2x/beige-fashion-background-with-girl-free-photo.jpg'),
('Olivia Taylor', 'Keratin Specialist', 'hair', 'Smoothing & Treatments', '6 years', 'https://i.pinimg.com/736x/f3/b5/2b/f3b52b312d4b55dd5941a0e4406d82f7.jpg'),

-- Waxing Specialists (4)
('Layla Hassan', 'Waxing Expert', 'wax', 'Full Body & Brazilian', '4 years', 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400'),
('Maya Ali', 'Skin Care & Waxing', 'wax', 'Sensitive Skin Specialist', '3 years', 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400'),
('Nora Ahmed', 'Sugaring Expert', 'wax', 'Organic & Sensitive Skin', '4 years', 'https://tse4.mm.bing.net/th/id/OIP.CsZp3geeS9mZmJTRk8wM2wHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'),
('Fatima Zahra', 'Waxing Therapist', 'wax', 'Precision & Comfort', '3 years', 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400'),

-- Makeup Artists (4)
('Emma Williams', 'Pro Makeup Artist', 'makeup', 'Bridal & Evening Looks', '6 years', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'),
('Zoe Carter', 'Beauty Makeup Artist', 'makeup', 'Editorial & Natural Makeup', '4 years', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400'),
('Lily Anderson', 'Glam Makeup Artist', 'makeup', 'Party & Event Makeup', '5 years', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400'),
('Ava Robinson', 'Creative Makeup Artist', 'makeup', 'Artistic & Avant-garde', '4 years', 'https://curiousmindmagazine.com/wp-content/uploads/2019/09/41954.webp'),

-- Nail Artists (4)
('Sophia Davis', 'Nail Technician', 'nails', 'Nail Art & Design', '4 years', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400'),
('Mia Thompson', 'Nail Care Specialist', 'nails', 'Gel & Acrylic Extensions', '3 years', 'https://i.pinimg.com/736x/8a/b1/f5/8ab1f5f40a7108cff22fce4803cdee69.jpg'),
('Isabella Clark', 'Nail Art Designer', 'nails', 'Hand-painted & 3D Art', '5 years', 'https://img.freepik.com/premium-photo/portrait-smiling-young-woman-against-beige-background_1048944-23382113.jpg'),
('Charlotte White', 'Pedicure Specialist', 'nails', 'Spa Pedicures & Foot Care', '4 years', 'https://media.istockphoto.com/id/172449690/photo/young-woman.jpg');