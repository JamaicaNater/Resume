const express = require('express');
const cors = require('cors')

const app = express();
const { connectDatabase, disconnectDatabase } = require('./models/db')

connectDatabase();

// Import routes
const homepageRoutes = require('./routes/homepage');
const projectRoutes = require('./routes/project');
const experineceRoutes = require('./routes/experience');
const referenceRoutes = require('./routes/reference');
const educationRoutes = require('./routes/education');
const userRoutes = require('./routes/user');
const jobRoutes = require('./routes/job');

// Middleware
app.use(express.json());
app.use(cors())

// Use routes
app.use('/', homepageRoutes);
app.use('/projects', projectRoutes);
app.use('/experience', experineceRoutes);
app.use('/reference', referenceRoutes);
app.use('/education', educationRoutes);
app.use('/user', userRoutes);
app.use('/job', jobRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
