import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Ticket from '../models/Tickets.js'
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/create",authMiddleware, async (req, res) => {
  try {
    console.log(req.body,"reqBoady")
    const { userId, title, description ,status} = req.body;

  console.log(req.body,"tequest")

    const ticket = await Ticket.create({
      userId,
      title,
      description,
     status
    });

    res.json({ message: "ticket created", ticket });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router