import express from "express";
import Resignation from "../models/Resignation.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const resignation = await Resignation.create(req.body);

    res.json({
      message: "Resignation created successfully",
      resignation,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const resignations = await Resignation.find();

    res.json({
      message: "Resignations fetched successfully",
      resignations,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const resignation = await Resignation.findById(req.params.id);

    if (!resignation) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({
      message: "Resignation fetched successfully",
      resignation,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const resignation = await Resignation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!resignation) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({
      message: "Resignation updated successfully",
      resignation,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const resignation = await Resignation.findByIdAndDelete(req.params.id);

    if (!resignation) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({
      message: "Resignation deleted successfully",
      resignation,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;