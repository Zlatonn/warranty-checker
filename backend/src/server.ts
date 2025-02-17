import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import authenRoutes from "./routes/authRoutes";
import itemsRoutes from "./routes/itemsRoutes";

// Create an Express application
const app = express();

// Using dotenv
dotenv.config();

// Define the port for the server
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors()); // Use cors to allow all domain
app.use(bodyParser.json()); // Use body Parser to get body from http request

// Routes
app.use("/auth", authenRoutes);
app.use("/items", itemsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
