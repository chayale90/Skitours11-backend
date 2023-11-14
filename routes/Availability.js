import express from 'express';
import { handleAvailabilityAdd, handleGetAvailabilities, hanldeAvailabilityRemove } from '../controllers/AvailabilityController.js';

const router = express.Router();

router.get('/get-availabilities',handleGetAvailabilities);
router.post('/add-availability',handleAvailabilityAdd);
router.post('/remove-availability',hanldeAvailabilityRemove);

export default router;