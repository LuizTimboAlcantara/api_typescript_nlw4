import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import { SurverysUsersRepository } from '../repositories/SurverysUsersRepository';

class NpsController {
  async execute(request: Request, response: Response) {
    const { survery_id } = request.params;

    const surverysUsersRepository = getCustomRepository(
      SurverysUsersRepository
    );

    const surveryUsers = await surverysUsersRepository.find({
      survery_id,
      value: Not(IsNull()),
    });

    const detractor = surveryUsers.filter(
      (survery) => survery.value >= 0 && survery.value <= 6
    ).length;

    const promoters = surveryUsers.filter(
      (survery) => survery.value >= 9 && survery.value <= 10
    ).length;

    const passive = surveryUsers.filter(
      (survery) => survery.value >= 7 && survery.value <= 8
    ).length;

    const totalAnswers = surveryUsers.length;

    const calculate = Number(
      (((promoters - detractor) / totalAnswers) * 100).toFixed(2)
    );

    return response.json({
      detractor,
      promoters,
      passive,
      totalAnswers,
      nps: calculate,
    });
  }
}

export { NpsController };
