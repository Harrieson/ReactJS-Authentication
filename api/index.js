import express from "express";
import mongoose from "mongoose";
import LeadRouter from "./routes/leads.routes.js";
import userRoutes from "./routes/user.routes.js";

mongoose
  .connect("mongodb://127.0.0.1:27017/")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.use("/api/user", userRoutes)
app.use("/api/leads", LeadRouter);