'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var grpc_js_1 = require('@grpc/grpc-js')
var helloworld_pb_1 = require('@blankhat/apis/lib/blankhat/helloworld/helloworld_pb')
var helloworld_grpc_pb_1 = require('@blankhat/apis/lib/blankhat/helloworld/helloworld_grpc_pb')
var server = new grpc_js_1.Server()
server.addService(helloworld_grpc_pb_1.HelloService, {
  sayHello: function (call, callback) {
    var response = new helloworld_pb_1.HelloReply()
    var name = call.request.getName
    response.setMessage('Hello '.concat(name))
    callback(null, response)
  }
})
server.bindAsync('0.0.0.0:50051', grpc_js_1.ServerCredentials.createInsecure(), function (error, port) {
  if (error) {
    throw error
  }
  console.log('gRPC:Server:'.concat(port), new Date().toLocaleString)
  server.start()
})
console.log('Server started on port 50051')
