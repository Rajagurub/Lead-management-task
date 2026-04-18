import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from '../models/Admin.js'

const router = express.Router();
router.post("/create", async (req, res) => {
  try {
    console.log(req.body,"reqBoady")
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({ message: "Admin created", admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

 
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role:admin.role
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;