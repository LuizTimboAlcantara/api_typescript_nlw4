import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { SurveysRepository } from '../repositories/SurveysRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import { SurverysUsersRepository } from '../repositories/SurverysUsersRepository';
import SendMailService from '../services/SendMailService';

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survery_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveryRepository = getCustomRepository(SurveysRepository);
    const surverysUsersRepository = getCustomRepository(
      SurverysUsersRepository
    );

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (!userAlreadyExists) {
      return response.status(400).json({ error: 'User does not exists' });
    }

    const survery = surveryRepository.findOne({ id: survery_id });

    if (!survery) {
      return response.status(400).json({ error: 'Survery dos not exists' });
    }

    const surveryUser = surverysUsersRepository.create({
      user_id: userAlreadyExists.id,
      survery_id,
    });

    await surverysUsersRepository.save(surveryUser);

    await SendMailService.execute(
      email,
      (
        await survery
      ).title,
      (
        await survery
      ).description
    );

    return response.status(201).json(surveryUser);
  }
}

export { SendMailController };
