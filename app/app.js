const express = require('express');
const app = express();
const { connectDatabase, disconnectDatabase } = require('./models/db')
const initData = require('./init-data')

connectDatabase();
initData();

// Import routes
const homepageRoutes = require('./routes/homepage');
const projectRoutes = require('./routes/project');
const experineceRoutes = require('./routes/experience');
const referenceRoutes = require('./routes/reference');
const educationRoutes = require('./routes/education');
const meRoutes = require('./routes/me');

// Middleware
app.use(express.json());

// Use routes
app.use('/', homepageRoutes);
app.use('/projects', projectRoutes);
app.use('/experience', experineceRoutes);
app.use('/reference', referenceRoutes);
app.use('/education', educationRoutes);
app.use('/me', meRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
