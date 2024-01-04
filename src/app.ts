import express from 'express';
import session from 'express-session';
import {connectToMongoDB, setupRoutes} from './config/databas';

// Create Express server
const app = express();
const PORT = process.env.PORT || 3000;

// Express configuration to parse the incoming requests with JSON payloads
app.use(express.json());

// setup express-session middleware to use session cookies
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//CORS
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header("Access-Control-Allow-Credentials", 'true');
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	next();
});
// Connect to MongoDB
connectToMongoDB();
setupRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});