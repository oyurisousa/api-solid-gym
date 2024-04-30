export class UserAlreadyExistError extends Error {
  constructor() {
    super('this email already exists!')
  }
}
