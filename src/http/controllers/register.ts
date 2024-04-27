import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { registerUseCase } from '@/use-cases/register'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const userBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = userBodySchema.parse(request.body)
  try {
    await registerUseCase({
      name,
      email,
      password,
    })
  } catch (error) {
    reply.status(409).send()
  }

  return reply.status(201).send()
}
