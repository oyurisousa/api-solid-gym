import { app } from '@/app'
import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })
  afterAll(() => {
    app.close()
  })

  it('shoule be able to refresh a token', async () => {
    await request(app.server).post('/users').send({
      name: 'yuri',
      email: 'yuri@gmail.com',
      password: '123456',
    })
    const authResponse = await request(app.server).post('/sessions').send({
      email: 'yuri@gmail.com',
      password: '123456',
    })

    let cookies = authResponse.get('Set-Cookie')

    if (!cookies) {
      cookies = []
    }

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
