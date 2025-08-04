import { Router } from 'express';
import clipdropRouter from './clipdrop.router';
import openAiRouter from './openai.router';
import pinterestRouter from './pinterest.router';
import discordRouter from './discord.router';

const router = Router();

router.use('/clipdrop', clipdropRouter);
router.use('/openai', openAiRouter);
router.use('/pinterest', pinterestRouter);
router.use('/discord', discordRouter);

export default router;
