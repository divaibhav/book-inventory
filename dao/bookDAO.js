const pool = require('../db/pool');

async function getAllBooks() {
  const [rows] = await pool.query('SELECT * FROM books');
  return rows;
}

async function getBookById(id) {
  const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [id]);
  return rows[0];
}

async function createBook({ title, author, genre, price, stock }) {
  const [result] = await pool.query(
    'INSERT INTO books (title, author, genre, price, stock) VALUES (?, ?, ?, ?, ?)',
    [title, author, genre, price, stock ?? 0]
  );
  return { id: result.insertId, title, author, genre, price, stock };
}

async function updateBook(id, { title, author, genre, price, stock }) {
  const [result] = await pool.query(
    'UPDATE books SET title = ?, author = ?, genre = ?, price = ?, stock = ? WHERE id = ?',
    [title, author, genre, price, stock, id]
  );
  return result.affectedRows;
}

async function deleteBook(id) {
  const [result] = await pool.query('DELETE FROM books WHERE id = ?', [id]);
  return result.affectedRows;
}

// Bonus — filter by genre
async function getBooksByGenre(genre) {
  const [rows] = await pool.query('SELECT * FROM books WHERE genre = ?', [genre]);
  return rows;
}

// Bonus — update stock only
async function updateStock(id, stock) {
  const [result] = await pool.query(
    'UPDATE books SET stock = ? WHERE id = ?',
    [stock, id]
  );
  return result.affectedRows;
}

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook, getBooksByGenre, updateStock };