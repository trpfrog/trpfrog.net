import { services } from '@trpfrog.net/constants'
import { io, Socket } from 'socket.io-client'

export function createClient(): Socket | null {
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  const endpoint = services.mdServer.development
  if (endpoint) {
    return io(endpoint)
  } else {
    throw new Error('No endpoint found')
  }
}
