import { EntityRepository, Repository } from 'typeorm';
import { SurveyUsers } from '../models/SurveyUser';

@EntityRepository(SurveyUsers)
class SurverysUsersRepository extends Repository<SurveyUsers> {}

export { SurverysUsersRepository };
