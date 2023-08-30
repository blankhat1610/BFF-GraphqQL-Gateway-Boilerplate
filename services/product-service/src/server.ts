import { type sendUnaryData, type ServerUnaryCall, status } from '@grpc/grpc-js'
import { type CreateProductRequest, type CreateProductResponse, type GetProductRequest, type GetProductResponse, type ListProductsRequest, type ListProductsResponse, type ProductServiceServer } from '@blankhat/protos/dist/product/product'
import { type DataSource } from 'typeorm'

export function getProductServer(db: DataSource): ProductServiceServer {
  async function createProduct(call: ServerUnaryCall<CreateProductRequest, CreateProductResponse>, callback: sendUnaryData<CreateProductResponse>) {
    callback({ code: status.UNIMPLEMENTED }, null)
  }
  async function getProduct(call: ServerUnaryCall<GetProductRequest, GetProductResponse>, callback: sendUnaryData<GetProductResponse>) {
    callback({ code: status.UNIMPLEMENTED }, null)
  }
  async function listProducts(call: ServerUnaryCall<ListProductsRequest, ListProductsResponse>, callback: sendUnaryData<ListProductsResponse>) {
    callback({ code: status.UNIMPLEMENTED }, null)
  }

  return {
    createProduct,
    getProduct,
    listProducts
  }
}
