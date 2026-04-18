import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from '../models/Admin.js'
import Leads from "../models/Leads.js";
import Sale from "../models/Sale.js";
import Ticket from "../models/Tickets.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/get", authMiddleware, async (req, res) => {
  try {
  
"solved", "unsolved", "in Progress"
   const leads = await Leads.countDocuments();
const assignedLeads = await Leads.countDocuments({ status: "Assigned" });
const progressLeads = await Leads.countDocuments({ status: "In progress" });
const reviewLeads = await Leads.countDocuments({ status: "Review" });
const finalLeads = await Leads.countDocuments({ status: "Final" });
const ticketCount = await Ticket.countDocuments();
const solvedCount = await Ticket.countDocuments({ status: "solved" });
const unsolvedCount = await Ticket.countDocuments({ status: "unsolved" });
const progressCount = await Ticket.countDocuments({ status: "In progress" });
const sale = await Sale.find();
const result ={
    leeds:{
      total:leads,
      assigned:assignedLeads,
      progress:progressLeads,
      review:reviewLeads,
      final:finalLeads
    },
    ticket:{
total:ticketCount,
solved:solvedCount,
unsolved:unsolvedCount,
progress:progressCount
    },
    salse:sale,

}
    res.json({
      message: "dashboad fetched successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;