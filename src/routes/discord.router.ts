import { Router } from 'express';
import { handleDiscordWebhook, getAllMJData, getLatestMJData } from '../controllers/discordController';

const router = Router();

router.post('/webhook', handleDiscordWebhook);
router.get('/data', getAllMJData);
router.get('/latest', getLatestMJData);

export default router;
