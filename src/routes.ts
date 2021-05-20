import { Router } from 'express';
import { SurveysController } from './controller/SurveysController';
import { UserController } from './controller/UserController';

const router = Router();

const userController = new UserController();
const surveryController = new SurveysController();

// Users
router.post('/users', userController.create);

// Survery
router.get('/survery', surveryController.show);
router.post('/survery', surveryController.create);

export { router };
