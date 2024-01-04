import { Rent } from '@/usecases/datatypes/rent';

export interface RentRepository {
  list(userId: number): Promise<Rent[]>;
  add(rent: Rent): Promise<Rent>;
}
