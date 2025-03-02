import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    appName: 
    { 
      type: String, 
      required: true 
    },
    description: 
    { 
      type: String, 
      required: true 
    },
  },
  { 
    timestamps: true 
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
