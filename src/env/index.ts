import 'dotenv/config'
import { z } from 'zod'

const schemaEnv = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  PORT: z.coerce.number().default(3333),
})

const _env = schemaEnv.safeParse(process.env)

if (_env.success === false) {
  console.error('⚠ Invalid environment', _env.error.format())
  throw new Error('Invalid environments variables!')
}

export const env = _env.data
