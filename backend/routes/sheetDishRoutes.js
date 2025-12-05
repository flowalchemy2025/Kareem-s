import express from "express";
import {
  fetchDishes,
  createDish,
  editDish,
  removeDish
} from "../controllers/sheetDishController.js";

const router = express.Router();

// GET all dishes
router.get("/", fetchDishes);

// ADD a dish
router.post("/", createDish);

// EDIT a dish — requires rowNumber
router.put("/:rowNumber", editDish);

// DELETE a dish — requires rowNumber
router.delete("/:rowNumber", removeDish);

export default router;
