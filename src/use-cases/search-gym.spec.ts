import { describe, expect, it, beforeEach } from 'vitest'
import { SearchGymUseCase } from './search-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: SearchGymUseCase

describe('Fetch user check-ins history', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymUseCase(inMemoryGymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await inMemoryGymsRepository.create({
      title: 'ZeroOne',
      description: 'the best, from zero to one',
      phone: '(88) 99999-8888',
      latitude: -2.9271375,
      longitude: -41.7256773,
    })
    await inMemoryGymsRepository.create({
      title: 'ZeroAll',
      description: 'the best, from zero to one',
      phone: '(88) 99999-8888',
      latitude: -2.9271375,
      longitude: -41.7256773,
    })
    const { gyms } = await sut.execute({ query: 'zero', page: 1 })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'ZeroOne' }),
      expect.objectContaining({ title: 'ZeroAll' }),
    ])
  })
  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymsRepository.create({
        title: `Zero${i}`,
        description: `the best, from zero ${i}`,
        phone: '(88) 99999-8888',
        latitude: -2.9271375,
        longitude: -41.7256773,
      })
    }

    const { gyms } = await sut.execute({ query: 'zero', page: 2 })
    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Zero21' }),
      expect.objectContaining({ title: 'Zero22' }),
    ])
  })
})
