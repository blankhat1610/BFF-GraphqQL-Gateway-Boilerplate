import 'reflect-metadata'
import dataSource from './db'
import { Server, ServerCredentials } from '@grpc/grpc-js'

const server = new Server()

const PORT = process.env.PORT != null ? Number(process.env.PORT) : 50051
const HOST = process.env.HOST ?? '0.0.0.0'

const address = `${HOST}:${PORT}`

dataSource
  .initialize()
  .then((db) => {
    server.bindAsync(address, ServerCredentials.createInsecure(), (error, port) => {
      if (error != null) {
        throw error
      }
      console.log('🚀 Server is running on', port)
      server.start()
    })
  })
  .catch((error) => {
    console.log(error)
  })
