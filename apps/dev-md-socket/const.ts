import { io } from 'socket.io-client'

export const SOCKET_PORT = 4000
export const SOCKET_URL = `http://localhost:${SOCKET_PORT}`

export function createClient() {
  return io(SOCKET_URL)
}
