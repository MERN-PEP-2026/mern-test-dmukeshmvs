import dotenv from"dotenv";
dotenv.config();

import cors from"cors";
import express from"express";
import connectDB from"./config/db.js";
import authRoutes from"./routes/authRoutes.js";
import taskRoutes from"./routes/taskRoutes.js";

connectDB();

const app=express();

app.use(cors({origin:"http://localhost:5173"}));
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/tasks",taskRoutes);4

app.get("/",(req,res)=>{
  res.send("Backend is connected");
});

app.listen(5000,()=>{
  console.log("Server is running on port 5000");
});