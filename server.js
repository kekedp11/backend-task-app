import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});