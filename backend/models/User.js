import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },

    empId: {
      type: String,
      required: true,
   
      lowercase: true,
      trim: true,
  
    },

    email: {
      type: String,
      required: true,
  
      lowercase: true,
      trim: true,
   
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },

    mobileNo: {
      type: String,
      required: true,
      trim: true,
      match: [/^[0-9]{10}$/, "Mobile number must be 10 digits"],
    },

    role: {
      type: String,
      enum: ["executive manager", "sales manager"],
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);