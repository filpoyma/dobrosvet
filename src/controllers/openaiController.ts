import { Request, Response } from "express";
import { generateTitleAndDescription } from "../services/openaiService";

export async function generateTitleAndDescriptionController(
  req: Request,
  res: Response
) {
  const { prompt, imageUrl } = req.body;
  if (!prompt || !imageUrl) {
    return res.status(400).json({ error: "Prompt and imageUrl are required" });
  }
  try {
    const { title, description } = await generateTitleAndDescription(
      prompt,
      imageUrl,
    );
    res.json({ title, description });
  } catch (error: any) {
    console.error("file-openaiController.ts error:", error);
    res
      .status(500)
      .json({
        error: error.message || "Failed to generate title and description",
      });
  }
}
