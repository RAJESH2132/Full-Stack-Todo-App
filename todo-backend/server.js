const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoutes = require("./Routes/todoRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/tasks", todoRoutes);

// MongoDB connection
const PORT = 5000;
const MONGO_URL = "mongodb://127.0.0.1:27017/todo-task";

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
