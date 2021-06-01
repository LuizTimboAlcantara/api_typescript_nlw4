import { Router } from 'express';

import { UserController } from './controller/UserController';
import { SurveysController } from './controller/SurveysController';
import { SendMailController } from './controller/SendMailController';
import { AnswerController } from './controller/AnswerController';
import { NpsController } from './controller/NpsController';

const router = Router();

const userController = new UserController();
const surveryController = new SurveysController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

//! Users
router.post('/users', userController.create);

//! Survery
router.get('/survery', surveryController.show);
router.post('/survery', surveryController.create);

//! SurveryUsers
router.post('/sendMail', sendMailController.execute);

//! Answer
router.get('/answers/:value', answerController.execute);

//! NPS
router.get('/nps/:survery_id', npsController.execute);

export { router };
