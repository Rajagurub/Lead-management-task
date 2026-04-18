import mongoose from "mongoose";
const leadSchema = new mongoose.Schema(
  {
   
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Assigned", "In progress", "Review","Final"],
      default: "In progress",
    },
  },
  { timestamps: true }
);

const Leads = mongoose.model("leads", leadSchema);

export default Leads;