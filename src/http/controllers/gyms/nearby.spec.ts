import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Nearby Gym (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })
  afterAll(() => {
    app.close()
  })

  it('shoule be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'ZeroAll',
        description: 'the best, from zero to one',
        phone: '(88) 99999-8888',
        latitude: -2.8915351,
        longitude: -41.6468856,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'ZeroOne',
        description: 'the best, from zero to one',
        phone: '(88) 99999-8888',
        latitude: -2.9271375,
        longitude: -41.7506933,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -2.9238915,
        longitude: -41.7506933,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'ZeroOne',
      }),
    ])
  })
})
