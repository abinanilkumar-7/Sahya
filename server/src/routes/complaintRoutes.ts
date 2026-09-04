import { Router } from 'express';
import { getComplaints, createComplaint, updateComplaintStatus } from '../controllers/complaintController';

const router = Router();

router.get('/', getComplaints);
router.post('/', createComplaint);
router.patch('/:id/status', updateComplaintStatus);

export default router;
