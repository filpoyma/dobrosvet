import { Router } from 'express';
import { generateTitleAndDescriptionController } from '../controllers/openaiController';

const router = Router();

router.post('/title-description', generateTitleAndDescriptionController);

export default router; 