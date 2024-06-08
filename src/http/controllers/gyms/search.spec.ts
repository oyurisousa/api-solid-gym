import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Gym (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })
  afterAll(() => {
    app.close()
  })

  it('shoule be able to search a gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Typescript Gym',
        description: 'some description',
        phone: '(88) 99999-9999',
        latitude: -2.9271375,
        longitude: -41.7256773,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Ruby Gym',
        description: 'some description',
        phone: '(88) 99999-9999',
        latitude: -2.9271375,
        longitude: -41.7256773,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'Typescript',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Typescript Gym',
      }),
    ])
  })
})
