import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function MakeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCase = new RegisterUseCase(prismaUsersRepository)

  return useCase
}
