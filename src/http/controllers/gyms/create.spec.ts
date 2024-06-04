import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Gym (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })
  afterAll(() => {
    app.close()
  })

  it('shoule be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Typescript Gym',
        description: 'some description',
        phone: '(88) 99999-9999',
        latitude: -2.9271375,
        longitude: -41.7256773,
      })

    expect(response.statusCode).toEqual(201)
  })
})
