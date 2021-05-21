import { Router } from 'express';

import { UserController } from './controller/UserController';
import { SurveysController } from './controller/SurveysController';
import { SendMailController } from './controller/SendMailController';

const router = Router();

const userController = new UserController();
const surveryController = new SurveysController();
const sendMailController = new SendMailController();

// Users
router.post('/users', userController.create);

// Survery
router.get('/survery', surveryController.show);
router.post('/survery', surveryController.create);

// SurveryUsers
router.post('/sendMail', sendMailController.execute);

export { router };
