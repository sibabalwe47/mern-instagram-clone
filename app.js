const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const db = require("./config/db");
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middleware/errorHandlers');
const multer = require('multer');
const upload = multer();

// Init 
const app = express();

// Configuration & Middleware

dotenv.config({path: './config/config.env'});

db();
app.use(express.json({extended: false}))
app.use(cors());
app.use(express.urlencoded({ extended: true })); 
app.use(bodyParser.urlencoded({extended: true}));

// Routes file paths
const user = require('./routes/api/auth');
const profile =require('./routes/api/profile');
const posts = require("./routes/api/posts");
const uploads = require("./routes/api/uploads");

// Routes
app.use("/api/auth", user);
app.use("/api/profile", profile);
app.use('/api/posts', posts);

// Error Handlers



// listen

const PORT = process.env.PORT | 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));