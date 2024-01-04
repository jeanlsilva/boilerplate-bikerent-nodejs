import { Controller } from '@/presentation/controllers/ports/controller';
import AuthenticateUser from '@/usecases/authenticate-user';
import { makeUserRepository } from './make-user-repository';
import { makeCandidateRepository } from './make-candidate-repository';
import { AuthenticateUserController } from '@/presentation/controllers/authenticate-user-controller';

export const makeAuthenticateUserController = (): Controller => {
  const userRepository = makeUserRepository();
  const candidateRepository = makeCandidateRepository();
  const useCase = new AuthenticateUser(userRepository, candidateRepository);
  const authenticateUserController = new AuthenticateUserController(useCase);
  return authenticateUserController;
};
