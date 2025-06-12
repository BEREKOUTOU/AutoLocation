-- Database schema for Car Rental Project

-- Table: users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: locations
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Table: vehicle_categories
CREATE TABLE vehicle_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Table: vehicles
CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    category_id INT REFERENCES vehicle_categories(id),
    image_url VARCHAR(255),
    price_per_day DECIMAL(10, 2) NOT NULL,
    transmission VARCHAR(20),
    seats INT,
    fuel_type VARCHAR(20)
);

-- Table: reservations
CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    vehicle_id INT REFERENCES vehicles(id),
    location_id INT REFERENCES locations(id),
    pickup_date DATE NOT NULL,
    pickup_time TIME NOT NULL,
    dropoff_date DATE NOT NULL,
    dropoff_time TIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: testimonials
CREATE TABLE testimonials (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data inserts

-- Locations
INSERT INTO locations (name) VALUES
('Paris'),
('Lyon'),
('Marseille'),
('Bordeaux'),
('Lille');

-- Vehicle Categories
INSERT INTO vehicle_categories (name) VALUES
('Économique'),
('SUV'),
('Premium');

-- Vehicles
INSERT INTO vehicles (brand, model, year, category_id, image_url, price_per_day, transmission, seats, fuel_type) VALUES
('Renault', 'Clio', 2022, 1, '/assets/images/Renault Clio.jpeg', 35.00, 'Manuelle', 5, 'Essence'),
('Peugeot', '3008', 2021, 2, '/assets/images/Peugeot 3008.jpg', 65.00, 'Automatique', 5, 'Diesel'),
('Citroën', 'C3', 2022, 1, '/assets/images/citroen-c3.jpg', 38.00, 'Manuelle', 5, 'Essence'),
('Audi', 'A4', 2021, 3, '/assets/images/Audi A4.jpg', 95.00, 'Automatique', 5, 'Diesel');

-- Users
INSERT INTO users (first_name, last_name, email, password_hash, phone) VALUES
('Marie', 'Lambert', 'marie.lambert@example.com', 'hashed_password_1', '0123456789'),
('Thomas', 'Durand', 'thomas.durand@example.com', 'hashed_password_2', '0987654321'),
('Sophie', 'Martin', 'sophie.martin@example.com', 'hashed_password_3', '0112233445');

-- Testimonials
INSERT INTO testimonials (user_id, rating, comment) VALUES
(1, 5, 'Service impeccable ! La réservation était simple et la voiture était en parfait état. Je recommande vivement AutoLocation pour tous vos besoins de location.'),
(2, 5, 'J\'ai loué un SUV pour un week-end en famille, et tout s\'est déroulé parfaitement. Le processus est transparent et le personnel très professionnel.'),
(3, 4, 'Prix compétitifs et grand choix de véhicules. La seule petite critique serait le temps d\'attente lors de la prise en charge, mais sinon tout était excellent.');
