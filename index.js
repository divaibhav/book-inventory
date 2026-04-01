const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

const authRoutes = require('./routes/authRoutes');

const bookRoutes = require('./routes/bookRoutes');
const authenticate = require('./middleware/authMiddleware');
app.use('/auth', authRoutes);
app.use('/books', authenticate, bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});