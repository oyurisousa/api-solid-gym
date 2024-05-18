export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super('max number of ckeck-ins reached.')
  }
}
