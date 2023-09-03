import { HelloClient } from '@blankhat/apis/lib/blankhat/helloworld/helloworld_grpc_pb'
import { HelloRequest } from '@blankhat/apis/lib/blankhat/helloworld/helloworld_pb'
import { credentials } from '@grpc/grpc-js'

const client = new HelloClient('0.0.0.0:50051', credentials.createInsecure())

const request = new HelloRequest()
request.setName('Thuong')

client.sayHello(request, (error, response) => {
  if (error) {
    console.log(`ERROR: ${error}`)
  }
  console.log(`Konnichiwa ${response.getMessage()}-san`)
})
