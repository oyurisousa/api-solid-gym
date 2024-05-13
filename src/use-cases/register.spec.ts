import { describe, expect, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistError } from './erros/user-already-exists-error'
import { UsersRepository } from '@/repositories/users-repository'

let usersRepository: UsersRepository
let sut: RegisterUseCase

describe('Register Use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'yuri',
      email: 'yuri@gmail.com',
      password: 'Iruysousa2004',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'yuri',
      email: 'yuri@gmail.com',
      password: 'Iruysousa2004',
    })
    const isPasswordCorrectlyHashed = await compare(
      'Iruysousa2004',
      user.password_hash,
    )
    await expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('not should create user with email already exists', async () => {
    const email = 'yurisousa20@gmail.com'

    await sut.execute({
      name: 'yuri',
      email,
      password: 'Iruysousa2004',
    })

    await expect(() =>
      sut.execute({
        name: 'yuri',
        email,
        password: 'Iruysousa2004',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistError)
  })
})
