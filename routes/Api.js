import  express from 'express';
import { handleGetAirportsByCity, handleGetAssets, handleGetTranslations } from '../controllers/ApiController.js';
const router = express.Router();



router.get('/translations',handleGetTranslations).get('/assets',handleGetAssets).get('/airports/:id',handleGetAirportsByCity);

export default router;