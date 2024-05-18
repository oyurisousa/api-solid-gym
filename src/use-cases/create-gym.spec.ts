import { describe, expect, it, beforeEach } from 'vitest'
import { GymsRepository } from '@/repositories/gyms-repository'
import { CreateGymUseCase } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: GymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'ZeroOne',
      description: 'the best, from zero to one',
      phone: '(88) 99999-8888',
      latitude: -2.9271375,
      longitude: -41.7256773,
    })

    expect(gym.title).toEqual('ZeroOne')
  })
})
