const pool = require('../db/pool');

async function findUserByUsername(username) {
  const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
}

async function createUser(username, hashedPassword) {
  const [result] = await pool.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword]
  );
  return { id: result.insertId, username };
}

module.exports = { findUserByUsername, createUser };