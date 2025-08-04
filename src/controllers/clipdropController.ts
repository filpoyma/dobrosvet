import { Request, Response } from "express";
import { generateClipdropImageAsBase64 } from "../services/clipdropService";
import { generateTitleAndDescription } from "../services/openaiService";

export async function generateImage(req: Request, res: Response) {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const imageBase64 = await generateClipdropImageAsBase64(prompt);
    const imageUrl = `data:image/png;base64,${imageBase64}`;
    res.json({ imageUrl });
  } catch (error: any) {
    console.error("clipdropController.ts error:", error.message);
    res.status(500).json({ message: error.message });
  }
}

export async function generateImageWithDescription(
  req: Request,
  res: Response
) {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    // const imageBase64 = await generateClipdropImageAsBase64(prompt);
    // const imageUrl = `data:image/png;base64,${imageBase64}`;

    const { title, description } = await generateTitleAndDescription(
      prompt,
      ""
    );

    res.json({ imageUrl: "", title, description });
  } catch (error: any) {
    console.error("clipdropController.ts error:", error.message);
    res.status(500).json(error);
  }
}
