export class MaxDistanceError extends Error {
  constructor(public distance: number) {
    super('the max distance of gym for check-in is ' + distance + 'km')
  }
}
