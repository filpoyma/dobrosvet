import { Router } from 'express';
import { generateImage, generateImageWithDescription } from '../controllers/clipdropController';

const router = Router();

router.post('/generate-image', generateImage);
router.post('/generate-image-with-description', generateImageWithDescription);

export default router; 