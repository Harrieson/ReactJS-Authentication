import cors from 'cors';
import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import { authRouter } from "./routes/auth.routes.js";
import LeadRouter from "./routes/leads.routes.js";
import userRoutes from "./routes/user.routes.js";


dotenv.config();
mongoose
  .connect("mongodb://127.0.0.1:27017/react-auth")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.use(express.json());
app.use(cors())

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api/user", userRoutes);
app.use("/api/leads", LeadRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
