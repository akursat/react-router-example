import { rest } from 'msw'
import { nanoid } from '@reduxjs/toolkit'

const token = nanoid()

export const handlers = [
  rest.get('/protected', (req, res, ctx) => {
    const headers = req.headers.all()
    if (headers.authorization !== `Bearer ${token}`) {
      return res(
        ctx.json({
          message: 'You shall not pass. Please login first.',
        }),
        ctx.status(401),
      )
    }
    return res(
      ctx.json({
        message: 'Success.',
      }),
    )
  }),
  rest.post('/login', (req, res, ctx) => {
    const { username } = req.body as any
    if (username === 'user') {
      return res(
        ctx.delay(400),
        ctx.json({
          user: {
            first_name: 'Paul',
            last_name: 'Atredes',
            role: 'user',
          },
          token,
        }),
      )
    }
    return res(
      ctx.delay(400),
      ctx.json({
        user: {
          first_name: 'Leydi',
          last_name: 'Jessica',
          role: 'admin',
        },
        token,
      }),
    )
  }),
]
