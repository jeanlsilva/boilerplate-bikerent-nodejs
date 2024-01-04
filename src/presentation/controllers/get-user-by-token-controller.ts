import { Controller } from '@/presentation/controllers/ports/controller';
import { UseCase } from '@/usecases/ports/use-case';
import { HttpRequest } from './ports';

export class GetUserByTokenController implements Controller {
  constructor(private readonly useCase: UseCase) {}

  async handle(request: HttpRequest): Promise<any> {
    try {
      const user = await this.useCase.perform(request.userId, request.token);
      console.log({ user })
      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
        console.log({ error })
      const userUnauthorized = error.constructor.name === 'UnauthorizedError';

      if (userUnauthorized) {
        return {
          statusCode: error.httpStatus,
          body: {
            errorType: error.constructor.name,
            message: error.message,
          },
        };
      }
      return {
        statusCode: 500,
        body: error,
      };
    }
  }
}
