import express from 'express';
import { handleEquipmentAdd, handleGetEquipment, handleGetEquipments, handleUpdateEquipment, hanldeEquipmentRemove } from '../controllers/equipmentController.js';
const router = express();

// Lessons
router.get('/all',handleGetEquipments).post('/add',handleEquipmentAdd).delete('/:id',hanldeEquipmentRemove).get('/:id',handleGetEquipment).post('/update',handleUpdateEquipment);


export default router;