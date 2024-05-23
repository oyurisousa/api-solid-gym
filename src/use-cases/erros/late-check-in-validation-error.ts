export class LateCheckInValidationError extends Error {
  constructor() {
    super(
      'The check-in can only be validated ultil 20 minutes of its creation.',
    )
  }
}
