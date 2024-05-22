import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(inMemoryGymsRepository)
  })

  it('should be able to find nearby gyms', async () => {
    await inMemoryGymsRepository.create({
      title: 'ZeroOne',
      description: 'the best, from zero to one',
      phone: '(88) 99999-8888',
      latitude: -2.9271375,
      longitude: -41.7506933,
    })
    await inMemoryGymsRepository.create({
      title: 'ZeroAll',
      description: 'the best, from zero to one',
      phone: '(88) 99999-8888',
      latitude: -2.8915351,
      longitude: -41.6468856,
    })

    const { gyms } = await sut.execute({
      userLatitude: -2.9271375,
      userLongitude: -41.7506933,
    })

    expect(gyms).toEqual([expect.objectContaining({ title: 'ZeroOne' })])
  })
})
