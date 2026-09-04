import { Router } from 'express';
import { getEmergencies, createEmergencyRequest, updateEmergencyStatus } from '../controllers/emergencyController';

const router = Router();

router.get('/', getEmergencies);
router.post('/', createEmergencyRequest);
router.patch('/:id/status', updateEmergencyStatus);

export default router;
