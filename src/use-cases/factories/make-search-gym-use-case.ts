import { SearchGymUseCase } from '../search-gym'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-reporitory'

export function MakeSearchGymUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const useCase = new SearchGymUseCase(prismaGymsRepository)

  return useCase
}
