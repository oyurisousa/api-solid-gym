import { app } from '@/app'
import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })
  afterAll(() => {
    app.close()
  })

  it('shoule be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'yuri',
      email: 'yuri@gmail.com',
      password: '123456',
    })
    expect(response.statusCode).toEqual(201)
  })
})
