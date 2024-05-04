import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistError } from './erros/user-already-exists-error'

describe('Register Use case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'yuri',
      email: 'yuri@gmail.com',
      password: 'Iruysousa2004',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'yuri',
      email: 'yuri@gmail.com',
      password: 'Iruysousa2004',
    })
    const isPasswordCorrectlyHashed = await compare(
      'Iruysousa2004',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('not should create user with email already exists', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'yurisousa20@gmail.com'

    await registerUseCase.execute({
      name: 'yuri',
      email,
      password: 'Iruysousa2004',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'yuri',
        email,
        password: 'Iruysousa2004',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistError)
  })
})
