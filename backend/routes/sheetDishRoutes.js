import express from "express";
import {
  fetchDishes,
  createDish,
  editDish,
  removeDish
} from "../controllers/sheetDishController.js";

const router = express.Router();

router.get("/", fetchDishes);
router.post("/add", createDish);
router.put("/edit", editDish);
router.delete("/delete/:rowNumber", removeDish);

export default router;
