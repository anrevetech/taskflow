require('dotenv').config();
const express = require('express');
const cors = require('cors');
const tasksRouter = require('./api/tasks');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/tasks', tasksRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});