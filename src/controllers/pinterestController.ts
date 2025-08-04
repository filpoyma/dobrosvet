import { Request, Response } from 'express';
import { publishPin } from '../services/pinterestService';

export async function publishPinController(req: Request, res: Response) {
  const { imageUrl, title, description, link } = req.body;
  if (!imageUrl || !title || !description) {
    return res.status(400).json({ error: 'imageUrl, title и description обязательны' });
  }
  try {
    const result = await publishPin({ imageUrl, title, description, link });
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to publish pin' });
  }
} 