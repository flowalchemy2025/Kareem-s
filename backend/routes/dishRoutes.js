import express from "express";
import { getAllDishes, addDish } from "../controllers/dishController.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.get("/", getAllDishes);
router.post("/add", verifyAdmin, addDish);

export default router;
