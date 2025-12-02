// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");

dotenv.config();

// Connect to MongoDB
connectDB();

const authRoutes = require("./routes/authRoutes");
const scanRoutes = require("./routes/scanRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(morgan("dev"));

app.use(
  cors({
    origin: "https://the-glimpse-of-bharat-code.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// extra CORS headers for preflight
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://the-glimpse-of-bharat-code.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/scans", scanRoutes);
app.use("/api/users", userRoutes);
app.use("/api/fighters", require("./routes/fighterRoutes"));
app.use("/api/contributions", require("./routes/contributionRoutes"));

app.get("/", (req, res) => res.send("Glimpse of bharat API running..."));

const PORT = 4000;
app.listen(PORT, () => console.log(`Server working fine on ${PORT}`));
