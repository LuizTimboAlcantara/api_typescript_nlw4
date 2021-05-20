import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';

class SurveysController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const surveysRepository = getCustomRepository(SurveysRepository);

    const survery = surveysRepository.create({
      title,
      description,
    });

    await surveysRepository.save(survery);

    return response.status(201).json(survery);
  }

  async show(request: Request, response: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository);

    const all = await surveysRepository.find();

    response.status(200).json(all);
  }
}

export { SurveysController };
