import { createServer } from 'http'
import path from 'path'

import { services } from '@trpfrog.net/constants'
import chokidar from 'chokidar'
import { Server } from 'socket.io'

const posts = path.join(__dirname, '..', '..', 'posts', '*.md')

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

const { port, development: devEndpoint } = services.mdServer
httpServer.listen(port, () => {
  console.log(`Markdown Watcher is now listening on ${devEndpoint}`)
})
