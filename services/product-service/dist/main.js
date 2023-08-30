'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
require('reflect-metadata')
const db_1 = __importDefault(require('./db'))
const grpc_js_1 = require('@grpc/grpc-js')
const server = new grpc_js_1.Server()
const HOST = process.env.HOST ?? '0.0.0.0'
const PORT = Number(process.env.PORT) ?? 50051
const address = `${HOST}:${PORT}`
db_1.default
  .initialize()
  .then((db) => {
    server.bindAsync(address, grpc_js_1.ServerCredentials.createInsecure(), (error, port) => {
      if (error != null) {
        console.log('error ne roi ne')
        throw error
      }
      console.log('🚀 Server is running on', port)
      server.start()
    })
  })
  .catch((error) => {
    console.log(error)
  })
//# sourceMappingURL=main.js.map
