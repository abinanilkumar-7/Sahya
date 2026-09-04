import { Router } from 'express';
import { getVolunteers, createVolunteer } from '../controllers/volunteerController';

const router = Router();

router.get('/', getVolunteers);
router.post('/', createVolunteer);

export default router;
