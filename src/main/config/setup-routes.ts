import { Express, Router } from 'express';
import { makeListBikesController } from '@/main/factories/make-list-bikes-controller';
import { makeListAvailableBikesController } from '@/main/factories/make-list-available-bikes-controller';
import { adaptRoute } from '@/main/adapters/express-route-adapter';
import { makeListUsersController } from '@/main/factories/make-list-users-controller';
import { makeCreateUserController } from '@/main/factories/make-create-user-controller';
import { makeCreateCandidateController } from '@/main/factories/make-create-candidate-controller';
import { makeRentBikeController } from '@/main/factories/make-rent-bike-controller';
import { makeAuthenticateUserController } from '../factories/make-authenticate-user.controller';
import { makeGetUserByTokenController } from '../factories/make-get-user-by-token.controller';
import { verifyToken } from '../middleware';

export function setupRoutes(app: Express): void {
  const router = Router();
  app.use('/api', router);
  createListBikesRoute(router);
  createListAvailableBikesRoute(router);
  createListUsersRoute(router);
  createCreateUserRoute(router);
  createCreateCandidateRoute(router);
  createRentBikeRoute(router);
  authenticateUserRoute(router);
  getUserByToken(router);
}

function createListBikesRoute(router: Router) {
  router.get('/bikes', adaptRoute(makeListBikesController()));
}

function createListAvailableBikesRoute(router: Router) {
  router.get('/bikes/available', adaptRoute(makeListAvailableBikesController()));
}

function createListUsersRoute(router: Router) {
  router.get('/users', adaptRoute(makeListUsersController()));
}

function createCreateUserRoute(router: Router) {
  router.post('/users', adaptRoute(makeCreateUserController()));
}

function createCreateCandidateRoute(router: Router) {
  router.post('/candidates', adaptRoute(makeCreateCandidateController()));
}

function createRentBikeRoute(router: Router) {
  router.post('/bikes/rent', adaptRoute(makeRentBikeController()));
}

function authenticateUserRoute(router: Router) {
  router.post('/users/authenticate', adaptRoute(makeAuthenticateUserController()));
}

function getUserByToken(router: Router) {
  router.get('/users/me', verifyToken, adaptRoute(makeGetUserByTokenController()));
}