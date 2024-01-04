import { Controller, HttpRequest } from '@/presentation/controllers/ports';
import { Request, Response } from 'express';

interface CustomRequest extends Request {
  userId?: string;
}

export function adaptRoute(controller: Controller) {
  return async (req: CustomRequest, res: Response) => {
    const httpRequest: HttpRequest = {
      token: req.headers.authorization,
      body: req.body,
      userId: req.userId
    };
    const httpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
}
