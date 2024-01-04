export class UserNotFoundError extends Error {
    public httpStatus = 404;
    constructor() {
      super('User not found');
      this.name = 'UserNotFoundError';
    }
  }
  