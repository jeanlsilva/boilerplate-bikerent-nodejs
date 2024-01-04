import { Controller } from '@/presentation/controllers/ports/controller';
import { makeUserRepository } from '@/main/factories/make-user-repository';
import { GetUserByToken } from '@/usecases/get-user-by-token';
import { GetUserByTokenController } from '@/presentation/controllers/get-user-by-token-controller';

export const makeGetUserByTokenController = (): Controller => {
  const userRepository = makeUserRepository();
  const useCase = new GetUserByToken(userRepository);
  const getUserByTokenController = new GetUserByTokenController(useCase);
  return getUserByTokenController;
};
