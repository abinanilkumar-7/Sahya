import { Router } from 'express';
import {
  getResources,
  getResourceById,
  getNearbyResources,
  createResource,
  verifyResource,
  updateAvailability,
  deleteResource,
} from '../controllers/resourceController';
import { authenticateJWT, requireRole } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getResources);
router.get('/nearby', getNearbyResources);
router.get('/:id', getResourceById);

// Protected Admin Routes
router.post('/', authenticateJWT, requireRole(['ADMIN', 'RESOURCE_PROVIDER']), createResource);
router.patch('/:id/verify', authenticateJWT, requireRole(['ADMIN']), verifyResource);
router.patch('/:id/availability', authenticateJWT, requireRole(['ADMIN', 'RESOURCE_PROVIDER']), updateAvailability);
router.delete('/:id', authenticateJWT, requireRole(['ADMIN']), deleteResource);

export default router;
