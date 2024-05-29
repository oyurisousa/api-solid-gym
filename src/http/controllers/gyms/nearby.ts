import { MakeFetchNearbyGymUseCase } from '@/use-cases/factories/make-fetch-nearby-gym-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = searchGymQuerySchema.parse(request.query)
  const createGymUseCase = MakeFetchNearbyGymUseCase()
  const { gyms } = await createGymUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.status(200).send({
    gyms,
  })
}
