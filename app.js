const express = require('express');
const apiRoutes = require('./routers/app.routers');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

app.use(errorMiddleware);

module.exports = app;
