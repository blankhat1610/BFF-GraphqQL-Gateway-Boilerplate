'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const typeorm_1 = require('typeorm')
const product_1 = require('../models/product')
const dataSource = new typeorm_1.DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST ?? 'localhost',
  port: Number(process.env.POSTGRES_PORT) ?? 5432,
  username: process.env.POSTGRES_USER ?? 'postgres',
  password: process.env.POSTGRES_PASSWORD ?? 'postgres',
  database: process.env.POSTGRES_DB ?? 'postgres',
  entities: [product_1.Product],
  logging: true,
  synchronize: true
})
exports.default = dataSource
//# sourceMappingURL=index.js.map
