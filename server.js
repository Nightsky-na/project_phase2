require('dotenv').config({ path: "./config/config.env" });
const express = require('express');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./config/db');
// ======== Require Packages ========

global.__basedir = __dirname;


db.sequelize.sync()
    .then(() => {
        console.log("======== Synced db. ========");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
});

// Development
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// ======== Connect to Database ========

const app = express();

// Use morgan to log every request to the console
app.use(morgan('dev'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/user', require('./routes/user'));
app.use('/login', require('./routes/login'));
app.use('/auth', require('./routes/auth'));
app.use('/product', require('./routes/product'));

app.use(errorHandler);
// ======== Initialize Middleware ========

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
// ======== Listen for Connections ========

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});

// ======== Handle Unhandled Promise Rejections ========