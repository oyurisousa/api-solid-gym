import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'john',
      email: 'john@example.com',
      password_hash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })
  const authReponse = await request(app.server).post('/sessions').send({
    email: 'john@example.com',
    password: '123456',
  })

  const { token } = authReponse.body
  return {
    token,
  }
}
