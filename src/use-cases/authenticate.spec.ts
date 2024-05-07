import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'
import { UsersRepository } from '@/repositories/users-repository'

let usersRepository: UsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'paulo',
      email: 'yuri@gmail.com',
      password_hash: await hash('Iruysousa2004', 6),
    })

    const { user } = await sut.execute({
      email: 'yuri@gmail.com',
      password: 'Iruysousa2004',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'yuria@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'paulo',
      email: 'yuri@gmail.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'yuri@gmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
