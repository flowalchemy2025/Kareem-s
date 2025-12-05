import { getAllDishes, addDish, updateDish, deleteDish } from "../services/googleSheets.js";

export const fetchDishes = async (req, res) => {
  const dishes = await getAllDishes();
  res.json(dishes);
};

export const createDish = async (req, res) => {
  await addDish(req.body);
  res.json({ message: "Dish added successfully" });
};

export const editDish = async (req, res) => {
  const { rowNumber, updatedData } = req.body;
  await updateDish(rowNumber, updatedData);
  res.json({ message: "Dish updated successfully" });
};

export const removeDish = async (req, res) => {
  const { rowNumber } = req.params;
  await deleteDish(rowNumber);
  res.json({ message: "Dish deleted successfully" });
};
