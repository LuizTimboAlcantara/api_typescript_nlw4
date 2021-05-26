import { Request, Response } from 'express';

import { getCustomRepository } from 'typeorm';
import { SurverysUsersRepository } from '../repositories/SurverysUsersRepository';

class AnswerController {
  //! Estrutura do link
  //! http://localhost:3333/answers/1?u=e3260ac2-32cb-4718-82a4-e5934d6fc7c7
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surveryUsersRepository = getCustomRepository(SurverysUsersRepository);

    const surveryUser = await surveryUsersRepository.findOne({
      id: String(u),
    });

    if (!surveryUser) {
      return response
        .status(400)
        .json({ error: 'Survery User does not exists!' });
    }

    surveryUser.value = Number(value);

    await surveryUsersRepository.save(surveryUser);

    return response.status(200).json(surveryUser);
  }
}

export { AnswerController };
