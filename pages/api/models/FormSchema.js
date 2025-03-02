import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
  {
    knowledgeBaseName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pattern: {
      type: String,
      required: true,
    },
    embeddings: {
      type: String,
      required: true,
    },
    metrics: {
      type: String,
      required: true,
    },
    chunking: {
      type: String,
      required: true,
    },
    vectorDB: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Form || mongoose.model("Form", formSchema);
