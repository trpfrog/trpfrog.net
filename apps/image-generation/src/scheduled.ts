import { services } from '@trpfrog.net/constants'

import type { Bindings } from '../worker-configuration'
import { app } from './app'

export const scheduled = async (
  _controller: ScheduledController,
  env: Bindings,
  executionCtx: ExecutionContext,
) => {
  const res = await app.request(
    `${services.imageGeneration.basePath}/update`,
    {
      method: 'POST',
      headers: {
        'x-api-key': env.TRPFROG_FUNCTIONS_SECRET,
      },
    },
    env,
    executionCtx,
  )

  if (!res.ok) {
    const body = await res.text()
    console.error(`Scheduled update failed: ${res.status} ${res.statusText}`, body)
    return
  }

  const result = (await res.json()) as unknown
  console.log('Scheduled update request finished:', result)
}
