import express from 'express';
const router = express();
import {handleAddLesson, handleGetAll, handleGetLesson, handleRemoveLesson, handleUpdateLesson} from '../controllers/lessonController.js';
import {handleAddCity,handleUpdateCity,handleAddAirport,handleUpdateAirport, handleGetAllCities, handleGetAllAirports, handleRemoveCity, handleRemoveAirport} from '../controllers/TargetController.js';

// Lessons
// router.get('/all',handleGetAll).post('/add',handleAddLesson).delete('/:id',handleRemoveLesson).get('/:id',handleGetLesson).post('/update',handleUpdateLesson);
// Cities
router.get('/city/all',handleGetAllCities).post('/city/add',handleAddCity).delete('/city/:id',handleRemoveCity).post('/city/update',handleUpdateCity);
// Airports
router.get('/airport/all',handleGetAllAirports).post('/airport/add',handleAddAirport).delete('/airport/:id',handleRemoveAirport).post('/airport/update',handleUpdateAirport);

export default router;