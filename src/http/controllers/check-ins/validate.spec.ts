import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Check-in Validate (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })
  afterAll(() => {
    app.close()
  })

  it('shoule be able to validate the check-in', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const gym = await prisma.gym.create({
      data: {
        title: 'Typescript',
        latitude: -2.9271375,
        longitude: -41.7256773,
      },
    })

    const user = await prisma.user.findFirstOrThrow()

    let checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})
