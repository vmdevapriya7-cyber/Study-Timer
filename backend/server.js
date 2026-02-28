const express = require("express");
const sessionRoutes = require('./router');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/sessions", sessionRoutes);

// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});