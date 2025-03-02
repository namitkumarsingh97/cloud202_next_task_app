import connectDB from "./config/db";
import User from "./models/UserSchema";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    try {
      const { appName, description } = req.body;

      if (!appName || !description) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newUser = new User({ appName, description });
      await newUser.save();

      return res
        .status(201)
        .json({ message: "User Basic Config Data submitted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server Error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
