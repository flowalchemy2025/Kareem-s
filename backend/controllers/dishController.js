import { db } from "../config/db.js";

export const getAllDishes = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM dishes WHERE available = 1");
  res.json(rows);
};

export const addDish = async (req, res) => {
  const { title, description, price, category, is_veg, image_url } = req.body;

  await db.query(
    "INSERT INTO dishes (title, description, price, category, is_veg, image_url, available) VALUES (?, ?, ?, ?, ?, ?, 1)",
    [title, description, price, category, is_veg, image_url]
  );

  res.json({ message: "Dish added" });
};
