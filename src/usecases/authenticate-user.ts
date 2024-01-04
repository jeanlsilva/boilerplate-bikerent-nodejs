import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@/main/config/auth';
import { User } from '@/usecases/datatypes/user';
import { UseCase } from '@/usecases/ports/use-case';
import { UserRepository } from '@/usecases/ports/user-repository';
import { CandidateRepository } from '@/usecases/ports/candidate-repository';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUser implements UseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly candidateRepository: CandidateRepository
    ) {}

    async perform(request: Request, candidateToken: string): Promise<Response> {
        try {
            const { email, password } = request;
            const candidate = await this.candidateRepository.findByToken(candidateToken);

            const user = await this.userRepository.findByEmail(email, candidate.id);
    
            if (!user) {
                throw new Error('Wrong email/password combination');
            }
    
            const passwordMatched = await compare(password, user.password);
    
            if (!passwordMatched) {
                throw new Error('Wrong email/password combination');
            }
    
            const { secret, expiresIn } = authConfig.jwt;
    
            const token = sign({}, secret, {
                subject: String(user.id),
                expiresIn
            });
    
            return {
                user,
                token
            };
        } catch (error) {
            console.log({ error });
        }
    }
}

export default AuthenticateUser;
