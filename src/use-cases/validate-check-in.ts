import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-in-repository'
import { ResourceNotFoundError } from './erros/resource-not-found-error'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './erros/late-check-in-validation-error'

interface ValidateCheckInUsecaseRequest {
  checkInId: string
}

interface ValidateCheckInUsecaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUsecase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUsecaseRequest): Promise<ValidateCheckInUsecaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)
    if (!checkIn) {
      throw new ResourceNotFoundError()
    }
    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }
    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)
    return {
      checkIn,
    }
  }
}
