import { Router } from 'express';
import { publishPinController } from '../controllers/pinterestController';

const router = Router();

router.post('/pin', publishPinController);

export default router; 