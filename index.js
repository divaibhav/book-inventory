const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

const bookRoutes = require('./routes/bookRoutes');
app.use('/books', bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});