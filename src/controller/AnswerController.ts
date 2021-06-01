import { Request, Response } from 'express';

import { getCustomRepository } from 'typeorm';
import { AppErro } from '../errors/AppErros';
import { SurverysUsersRepository } from '../repositories/SurverysUsersRepository';

class AnswerController {
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surveryUsersRepository = getCustomRepository(SurverysUsersRepository);

    const surveryUser = await surveryUsersRepository.findOne({
      id: String(u),
    });

    if (!surveryUser) {
      throw new AppErro('Survery User does not exists!');
    }

    surveryUser.value = Number(value);

    await surveryUsersRepository.save(surveryUser);

    return response.status(200).json(surveryUser);
  }
}

export { AnswerController };
