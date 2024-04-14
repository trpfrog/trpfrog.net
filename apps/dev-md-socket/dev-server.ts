import { createServer } from 'http'
import path from 'path'

import chokidar from 'chokidar'
import { Server } from 'socket.io'

import { SOCKET_PORT } from './const'
const posts = path.join(__dirname, '..', 'src', 'posts', '*.md')

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
})

io.on('connection', socket => {
  console.log('connected')
  socket.on('error', console.error)

  socket.on('message', data => {
    console.log('received: %s', data)
  })
})

const watcher = chokidar.watch(posts)

watcher.on('change', markdownPath => {
  const slug = path.basename(markdownPath).replace('.md', '')
  console.log('changed', slug)
  io.emit('update', slug)
})

httpServer.listen(SOCKET_PORT, () => {
  console.log(
    `Markdown Watcher is now listening on http://localhost:${SOCKET_PORT}`,
  )
})
