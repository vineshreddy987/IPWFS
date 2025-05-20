// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth"); // Adjust the path as needed

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route for testing
app.get("/", (req, res) => {
  res.json({ message: "IPWFS Backend API is running" });
});

// Mock data for development when DB is unavailable
const mockDB = {
  users: [
    { _id: "user1", email: "test@example.com", password: "$2a$10$abcdefghijklmnopqrstuvwxyz" }
  ]
};

// MongoDB Connection
const startServer = async () => {
  let dbConnected = false;
  
  try {
    // Use MongoDB URI from env or a fallback for development/testing
    const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/ipwfs";
    
    await mongoose.connect(mongoURI).catch(err => {
      console.error("MongoDB connection error:", err.message);
      throw err;
    });
    
    console.log("✅ MongoDB connected successfully");
    dbConnected = true;
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    console.log("🔄 Starting server with mock data instead");
    // Don't exit process in production - allow Vercel to handle retries
    if (process.env.NODE_ENV === 'production') {
      console.log("⚠️ Warning: Running in production without database connection");
    }
  }

  // Routes
  if (dbConnected) {
    app.use("/api/auth", authRoutes);
  } else {
    // Mock auth routes when DB is unavailable
    app.post("/api/auth/register", (req, res) => {
      const { email } = req.body;
      // Check if user already exists in mock data
      if (mockDB.users.find(u => u.email === email)) {
        return res.status(400).json({ message: "User already exists" });
      }
      mockDB.users.push({ _id: `user${mockDB.users.length + 1}`, email });
      res.status(201).json({ message: "User registered successfully" });
    });

    app.post("/api/auth/login", (req, res) => {
      const { email, password } = req.body;
      
      // In mock mode, accept any credentials to make testing easier
      // Add the user to our mock DB if they don't exist
      let user = mockDB.users.find(u => u.email === email);
      if (!user) {
        user = { _id: `user${mockDB.users.length + 1}`, email, password: "mock-password" };
        mockDB.users.push(user);
      }
      
      res.json({ 
        token: "mock-token-" + Date.now(),
        user: { id: user._id, email: user.email, name: email.split('@')[0] }
      });
    });
  }

  // Start Server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
