import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Sale from "../models/Sale.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const sales = await Sale.find();

    res.json({
      message: "Sales fetched successfully",
      sales,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/create", authMiddleware, async (req, res) => {
  try {
    console.log(req.body, "sales body");

    const sale = await Sale.create({
      ...req.body,
    });

    res.json({
      message: "Sale created successfully",
      sale,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router