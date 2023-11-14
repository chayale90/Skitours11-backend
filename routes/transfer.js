import express from 'express';
import {handleGetVehicles,handleVehicleAdd,hanldeVehicleRemove} from '../controllers/transfersController.js';

const router = express.Router();

router.get('/get-vehicles',handleGetVehicles);
router.post('/add-vehicle',handleVehicleAdd);
router.post('/remove-vehicle',hanldeVehicleRemove);

export default router;