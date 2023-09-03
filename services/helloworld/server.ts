import { Server, ServerCredentials, ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js'
import { HelloRequest, HelloReply } from '@blankhat/apis/lib/blankhat/helloworld/helloworld_pb'
import { HelloClient, HelloService } from '@blankhat/apis/lib/blankhat/helloworld/helloworld_grpc_pb'

const server = new Server()

server.addService(HelloService, {
  sayHello: (call: ServerUnaryCall<HelloRequest, HelloReply>, callback: sendUnaryData<HelloReply>) => {
    const response = new HelloReply()
    const name = call.request.getName
    response.setMessage(`Hello ${name}`)
    callback(null, response)
  }
})

server.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), (error, port) => {
  if (error) {
    throw error
  }

  console.log(`gRPC:Server:${port}`, new Date().toLocaleString())
  server.start()
})

console.log('Server started on port 50051')
