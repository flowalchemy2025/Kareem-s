import { db } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await db.query("SELECT * FROM admins WHERE email = ?", [email]);
  if (rows.length === 0) return res.status(401).json({ message: "Invalid login" });

  const admin = rows[0];
  const isMatch = await bcrypt.compare(password, admin.password_hash);

  if (!isMatch) return res.status(401).json({ message: "Invalid login" });

  const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.json({ token });
};
