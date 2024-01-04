import { RentBikeController } from '@/presentation/controllers/rent-bike-controller';
import { Controller } from '@/presentation/controllers/ports/controller';
import { RentBike } from '@/usecases/rent-bike';
import { makeRentRepository } from './make-rent-bike-repository';

export const makeRentBikeController = (): Controller => {
  const rentRepository = makeRentRepository();
  const useCase = new RentBike(rentRepository);
  const rentBikeController = new RentBikeController(useCase);
  return rentBikeController;
};
