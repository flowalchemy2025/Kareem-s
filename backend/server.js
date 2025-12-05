import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import sheetDishRoutes from "./routes/sheetDishRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/dishes", sheetDishRoutes);

app.listen(8000, () => console.log("Server running on port 8000"));
