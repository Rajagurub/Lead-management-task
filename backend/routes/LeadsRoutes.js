import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Leads from '../models/Leads.js'
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/create",authMiddleware, async (req, res) => {
  try {
    console.log(req.body,"reqBoady")
    const leads = await Leads.create({
      ...req.body
    });

    res.json({ message: "lead created", leads });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/get", authMiddleware, async (req, res) => {
  try {
    console.log(req.user, "decoded user from token");

    const leads = await Leads.find();

    res.json({
      message: "leads fetched successfully",
      leads,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const updatedLead = await Leads.findByIdAndUpdate(
      id,
      req.body,
      { new: true } 
    );

    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json({
      message: "Lead updated successfully",
      lead: updatedLead,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLead = await Leads.findByIdAndDelete(id);

    if (!deletedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json({
      message: "Lead deleted successfully",
      lead: deletedLead,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router