import { app } from '@/app'
import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })
  afterAll(() => {
    app.close()
  })

  it('shoule be able to get user profile', async () => {
    await request(app.server).post('/users').send({
      name: 'yuri',
      email: 'yuri@gmail.com',
      password: '123456',
    })
    const authReponse = await request(app.server).post('/sessions').send({
      email: 'yuri@gmail.com',
      password: '123456',
    })

    const { token } = authReponse.body

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'yuri@gmail.com',
      }),
    )
  })
})
