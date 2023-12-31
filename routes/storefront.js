import express from 'express';
import {handleGetHelments, handleHelmentAdd, hanldeHelmentRemove, handleGetEquipments, handleEquipmentAdd, hanldeEquipmentRemove, handleGetLessonTypes, handleLessonTypeAdd, hanldeLessonTypeRemove, handleGetSkillLevels, handleSkillLevelAdd, hanldeSkillLevelRemove} from '../controllers/storefrontController.js';
import Vehicle from '../models/vehicle.js';

const router = express.Router();

router.get('/',async function(req,res){
  const vehicles = await Vehicle.findAll();
  return res.render('admin/storefront',{vehicles});
});

router.get('/get-helments',handleGetHelments);
router.post('/add-helment',handleHelmentAdd);
router.post('/remove-helment',hanldeHelmentRemove);

router.get('/get-equipments',handleGetEquipments);
router.post('/add-equipment',handleEquipmentAdd);
router.post('/remove-equipment',hanldeEquipmentRemove);

router.get('/get-lessontypes',handleGetLessonTypes);
router.post('/add-lessontype',handleLessonTypeAdd);
router.post('/remove-lessontype',hanldeLessonTypeRemove);

router.get('/get-skilllevels',handleGetSkillLevels);
router.post('/add-skilllevel',handleSkillLevelAdd);
router.post('/remove-skilllevel',hanldeSkillLevelRemove);

export default router;