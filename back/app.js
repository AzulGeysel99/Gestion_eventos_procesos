const express = require('express');
const cookieParser = require('cookie-parser');
require('./config/db.js');
const { STATUS_CODES } = require('./helpers/constants.js');
const { authRoutes } = require('./routes/routes.js');
const { AppError, handleError } = require('./helpers/error.js');


const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
authRoutes(app);
userRoutes(app); // Make sure you have imported and defined userRoutes

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.method} ${req.originalUrl} on this server!`, STATUS_CODES.NOT_FOUND));
});

// centralized error handling
app.use((err, req, res, next) => {
  handleError(err, req, res, next);
});

// running the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));