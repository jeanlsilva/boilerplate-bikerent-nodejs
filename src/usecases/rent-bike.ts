import { UseCase } from '@/usecases/ports/use-case';
import { RentRepository } from './ports/rent-repository';
import { Rent } from './datatypes/rent';

export class RentBike implements UseCase {
  constructor(
    private readonly rentRepository: RentRepository,
  ) {}

  async perform(rent: Rent, candidateToken: string): Promise<Rent> {
    return await this.rentRepository.add(rent);
  }
}
