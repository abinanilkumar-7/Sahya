import { Router } from 'express';
import { processAssistantChat } from '../controllers/assistantController';

const router = Router();

router.post('/chat', processAssistantChat);

export default router;
