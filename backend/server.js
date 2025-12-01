import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Middleware to verify JWT token (admin authentication)
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, admin) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.admin = admin;
    next();
  });
};

// ---------------------------------------
// ADMIN LOGIN
// ---------------------------------------
app.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await db.query("SELECT * FROM admins WHERE email = ?", [
    email,
  ]);

  if (rows.length === 0)
    return res.status(400).json({ message: "Invalid credentials" });

  const admin = rows[0];
  const match = await bcrypt.compare(password, admin.password_hash);

  if (!match)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: admin.id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.json({ token });
});

// ---------------------------------------
// DISHES CRUD ROUTES
// ---------------------------------------

// Get all dishes
app.get("/dishes", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM dishes ORDER BY category");
  res.json(rows);
});

// Add dish
app.post("/dishes", verifyAdmin, async (req, res) => {
  const { title, description, price, category, is_veg, available, image_url } =
    req.body;

  await db.query(
    "INSERT INTO dishes (title, description, price, category, is_veg, available, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [title, description, price, category, is_veg, available, image_url]
  );

  res.json({ message: "Dish added" });
});

// Edit dish
app.put("/dishes/:id", verifyAdmin, async (req, res) => {
  const id = req.params.id;
  const {
    title,
    description,
    price,
    category,
    is_veg,
    available,
    image_url,
  } = req.body;

  await db.query(
    "UPDATE dishes SET title=?, description=?, price=?, category=?, is_veg=?, available=?, image_url=? WHERE id=?",
    [
      title,
      description,
      price,
      category,
      is_veg,
      available,
      image_url,
      id,
    ]
  );

  res.json({ message: "Dish updated" });
});

// Delete dish
app.delete("/dishes/:id", verifyAdmin, async (req, res) => {
  const id = req.params.id;
  await db.query("DELETE FROM dishes WHERE id=?", [id]);
  res.json({ message: "Dish deleted" });
});

app.listen(8081, () =>
  console.log("Backend running at http://localhost:8081")
);