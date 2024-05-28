import { UserAlreadyExistError } from '@/use-cases/erros/user-already-exists-error'
import { MakeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const userBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = userBodySchema.parse(request.body)
  try {
    const registerUseCase = MakeRegisterUseCase()
    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistError) {
      reply.status(409).send({
        message: err.message,
      })
    }
    throw err
  }

  return reply.status(201).send()
}
