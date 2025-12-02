import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes.js";
import dishRoutes from "./routes/dishRoutes.js";


const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/dishes", dishRoutes);

app.listen(8081, () => console.log("Backend running on port 8081"));

console.log("ENV CHECK:", process.env.DB_USER, process.env.DB_NAME);
