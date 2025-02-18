import { UseCase } from '@/usecases/ports/use-case';
import { Controller, HttpRequest } from '@/presentation/controllers/ports';

export class RentBikeController implements Controller {
  constructor(private readonly useCase: UseCase) {}

  async handle(request: HttpRequest): Promise<any> {
    try {
      const rent = await this.useCase.perform(request.body, request.token);
      return {
        statusCode: 201,
        body: rent,
      };
    } catch (error) {
      const userNonExistent = error.constructor.name === 'ExistingUserError';
      const userUnauthorized = error.constructor.name === 'UnauthorizedError';

      if (userNonExistent || userUnauthorized) {
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
