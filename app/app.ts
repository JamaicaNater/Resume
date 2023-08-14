const express = require('express');
const session = require('express-session');
import RedisStore from "connect-redis"
import {createClient} from "redis"

const cors = require('cors')
const requireAuth = require('./middleware/requireAuth')

const app = express();
const { connectDatabase, disconnectDatabase } = require('./models/db')

connectDatabase();
let redisClient = createClient({
  url: 'redis://redis:6379',
  // pass: 'your-redis-password', 
})

try {
  redisClient.connect()
  console.log('Connected to Redis')
} catch (error) {
  console.error(error)
}

const options = {
  client: redisClient,
  prefix: 'myapp:', 
  ttl: 3600, // Session expiration in seconds (1 hour)
  db: 0,
};

let redisStore = new RedisStore(options)

// Import routes
const homepageRoutes = require('./routes/homepage');
const projectRoutes = require('./routes/project');
const experineceRoutes = require('./routes/experience');
const referenceRoutes = require('./routes/reference');
const educationRoutes = require('./routes/education');
const userRoutes = require('./routes/user');
const jobRoutes = require('./routes/job');
const tagRoutes = require('./routes/tag');
const authRoutes = require('./routes/auth');

//Middleware
app.use(session({
  store: redisStore,
  secret: process.env.API_SESSION_KEY,
  resave: false,
  saveUninitialized: true,
}));

// Apply requireAuth middleware for all routes except /auth
app.use(requireAuth.unless({
  path : [
    '/',
    '/auth',
    '/auth/'
  ],
  method: ['OPTIONS']
}));

app.use(express.json());

const corsOptions = {
  origin: ['http://localhost:5173', 'https://localhost'],
  credentials: true,
}

app.options('*', cors(corsOptions));

app.use(cors(corsOptions));

// Use routes
app.use('/', homepageRoutes);
app.use('/projects', projectRoutes);
app.use('/experience', experineceRoutes);
app.use('/reference', referenceRoutes);
app.use('/education', educationRoutes);
app.use('/user', userRoutes);
app.use('/job', jobRoutes);
app.use('/tag', tagRoutes);
app.use('/auth', authRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
