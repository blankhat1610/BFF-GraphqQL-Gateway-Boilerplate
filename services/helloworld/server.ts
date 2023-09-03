import { Server, ServerCredentials, ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js'
import { HelloRequest, HelloReply } from '@blankhat/apis/lib/blankhat/helloworld/helloworld_pb'
import { HelloService } from '@blankhat/apis/lib/blankhat/helloworld/helloworld_grpc_pb'

const port = process.env.GRPC_PORT
const host = process.env.GRPC_HOST

const server = new Server()

server.addService(HelloService, {
  sayHello: (call: ServerUnaryCall<HelloRequest, HelloReply>, callback: sendUnaryData<HelloReply>) => {
    const response = new HelloReply()
    const name = call.request.getName()
    response.setMessage(name)
    callback(null, response)
  }
})

server.bindAsync(`${host}:${port}`, ServerCredentials.createInsecure(), (error, port) => {
  if (error) {
    throw error
  }

  console.log(`gRPC:Server:${port}`, new Date().toLocaleString())
  server.start()
})
