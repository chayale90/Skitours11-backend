import express from 'express';

import {handleGetAll,handleUpdateTranslation,handleAddTranslation,handleDeleteTranslation} from '../controllers/TranslationController.js';

const Router = express.Router();

Router.get('/',handleGetAll).patch('/',handleUpdateTranslation).post('/',handleAddTranslation).delete('/',handleDeleteTranslation);

export default Router;