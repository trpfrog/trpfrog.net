import { endpoints } from '@trpfrog.net/constants'
import { io, Socket } from 'socket.io-client'

export function createClient(): Socket {
  const endpoint = endpoints.mdServer
  if (endpoint) {
    return io(endpoint)
  } else {
    throw new Error('No endpoint found')
  }
}
