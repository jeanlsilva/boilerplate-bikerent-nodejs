import { RentRepository } from "@/usecases/ports/rent-repository";
import prismaClient from '@/external/repository/prisma/prisma-client';
import { Rent } from "@/usecases/datatypes/rent";

export class PrismaRentRepository implements RentRepository {
    async list(userId: number): Promise<Rent[]> {
        const rents = await prismaClient.rent.findMany({
          where: {
            userId,
          },
        });
        return rents;
      }
    
      async add(rent: Rent): Promise<Rent> {
        const { userId, bikeId, subtotal, feeAmount, total } = rent;
        const createdRent = await prismaClient.rent.create({
          data: {
            userId,
            bikeId,
            subtotal,
            feeAmount,
            total
          },
        });
        return createdRent;
      }
}