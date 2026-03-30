CREATE DATABASE IF NOT EXISTS bookstore_db;
USE bookstore_db;

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(150) NOT NULL,
    genre VARCHAR(100),
    price DECIMAL(6,2) NOT NULL,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO books (title, author, genre, price, stock) VALUES
('The Pragmatic Programmer', 'David Thomas', 'Technology', 899.00, 12),
('Atomic Habits', 'James Clear', 'Self Help', 499.00, 25),
('The Alchemist', 'Paulo Coelho', 'Fiction', 299.00, 18);