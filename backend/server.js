import express from"express";
import dotenv from"dotenv";
import connectDB from"./config/db.js";

dotenv.config();
connectDB();

import authRoutes from"./routes/authRoutes.js";
import taskRoutes from"./routes/taskRoutes.js";


const app=express();

app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/tasks",taskRoutes);

app.get("/",(req,res)=>{
  res.send("Backend running");
});

app.listen(5000,()=>{
  console.log("Server running on 5000");
});