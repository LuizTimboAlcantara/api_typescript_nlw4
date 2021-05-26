import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { SurveysRepository } from '../repositories/SurveysRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import { SurverysUsersRepository } from '../repositories/SurverysUsersRepository';
import SendMailService from '../services/SendMailService';

import { resolve } from 'path';

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survery_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveryRepository = getCustomRepository(SurveysRepository);
    const surverysUsersRepository = getCustomRepository(
      SurverysUsersRepository
    );

    const user = await usersRepository.findOne({ email });

    if (!user) {
      return response.status(400).json({ error: 'User does not exists' });
    }

    const survery = surveryRepository.findOne({ id: survery_id });

    if (!survery) {
      return response.status(400).json({ error: 'Survery dos not exists' });
    }

    const variables = {
      name: user.name,
      title: (await survery).title,
      description: (await survery).description,
      user_id: user.id,
      link: process.env.URL_MAIL,
    };

    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');

    const surveryUserAlreadyExists = await surverysUsersRepository.findOne({
      where: [{ user_id: user.id }, { value: null }],
      relations: ['user', 'survery'],
    });

    if (surveryUserAlreadyExists) {
      await SendMailService.execute(
        email,
        (
          await survery
        ).title,
        variables,
        npsPath
      );
      return response.json(surveryUserAlreadyExists);
    }

    const surveryUser = surverysUsersRepository.create({
      user_id: user.id,
      survery_id,
    });

    await surverysUsersRepository.save(surveryUser);

    await SendMailService.execute(
      email,
      (
        await survery
      ).title,
      variables,
      npsPath
    );

    return response.status(201).json(surveryUser);
  }
}

export { SendMailController };
