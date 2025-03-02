import connectDB from "./config/db";
import Form from "./models/FormSchema";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    try {
      const {
        knowledgeBaseName,
        description,
        pattern,
        embeddings,
        metrics,
        chunking,
        vectorDB,
      } = req.body;

      if (
        !knowledgeBaseName ||
        !description ||
        !pattern ||
        !embeddings ||
        !metrics ||
        !chunking ||
        !vectorDB
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newForm = new Form({
        knowledgeBaseName,
        description,
        pattern,
        embeddings,
        metrics,
        chunking,
        vectorDB,
      });
      await newForm.save();

      return res
        .status(201)
        .json({ message: "RAG Config submitted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server Error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
