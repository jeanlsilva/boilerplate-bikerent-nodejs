import { UseCase } from '@/usecases/ports/use-case';
import { UserRepository } from '@/usecases/ports/user-repository';
import { User } from '@/usecases/datatypes/user';
import { UserNotFoundError } from './errors/user-not-found-error';

export class GetUserByToken implements UseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async perform(userId: User, candidateToken: string): Promise<User | undefined> {
    const user = await this.userRepository.findById(Number(userId));

    if (!user) {
      throw new UserNotFoundError();
    }

    delete user.password;
    
    return user;
  }
}
