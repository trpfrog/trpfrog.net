import { devEndpoints } from '@trpfrog.net/constants'
import { io, Socket } from 'socket.io-client'

export function createClient(): Socket | null {
  // eslint-disable-next-line n/no-process-env
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const endpoint = devEndpoints.mdServer
  if (endpoint) {
    return io(endpoint)
  } else {
    throw new Error('No endpoint found')
  }
}
