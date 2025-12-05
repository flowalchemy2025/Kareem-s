import {
  getAllDishes,
  addDish,
  updateDish,
  deleteDish,
} from "../services/googleSheets.js";

// ----------------------------------------------------
// GET: Fetch All Dishes
// ----------------------------------------------------
export const fetchDishes = async (req, res) => {
  try {
    const dishes = await getAllDishes();
    return res.json(dishes);
  } catch (error) {
    console.error("Error fetching dishes:", error);
    return res.status(500).json({ error: "Failed to fetch dishes" });
  }
};

// ----------------------------------------------------
// POST: Add New Dish
// ----------------------------------------------------
export const createDish = async (req, res) => {
  try {
    const data = req.body;

    if (!data?.name || !data?.price || !data?.category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await addDish(data);
    return res.json({ message: "Dish added successfully" });

  } catch (error) {
    console.error("Error adding dish:", error);
    return res.status(500).json({ error: "Failed to add dish" });
  }
};

// ----------------------------------------------------
// PUT: Update Dish
// ----------------------------------------------------
export const editDish = async (req, res) => {
  try {
    const { rowNumber } = req.params;
    const updatedData = req.body;

    if (!rowNumber) {
      return res.status(400).json({ error: "rowNumber missing" });
    }

    await updateDish(Number(rowNumber), updatedData);
    return res.json({ message: "Dish updated successfully" });

  } catch (error) {
    console.error("Error updating dish:", error);
    return res.status(500).json({ error: "Failed to update dish" });
  }
};

// ----------------------------------------------------
// DELETE: Remove Dish
// ----------------------------------------------------
export const removeDish = async (req, res) => {
  try {
    const { rowNumber } = req.params;

    if (!rowNumber) {
      return res.status(400).json({ error: "rowNumber missing" });
    }

    await deleteDish(Number(rowNumber));
    return res.json({ message: "Dish deleted successfully" });

  } catch (error) {
    console.error("Error deleting dish:", error);
    return res.status(500).json({ error: "Failed to delete dish" });
  }
};