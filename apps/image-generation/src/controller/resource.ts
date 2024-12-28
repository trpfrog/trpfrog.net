import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'

import { Env } from '../env'

import { requiresApiKey } from './middlewares'

export const resourceApp = new Hono<Env>()
  .use(requiresApiKey())
  .delete('/:id', requiresApiKey(), async c => {
    const id = c.req.param('id')
    try {
      await c.var.UCS.softDelete(id)
      return c.text('ok', 200)
    } catch (e) {
      console.error(e)
      throw new HTTPException(500)
    }
  })
  .post('/:id/undelete', requiresApiKey(), async c => {
    const id = c.req.param('id')
    try {
      await c.var.UCS.undelete(id)
      return c.text('ok', 200)
    } catch (e) {
      console.error(e)
      throw new HTTPException(500)
    }
  })
