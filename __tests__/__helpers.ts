import { ServerInfo } from 'apollo-server'
import { GraphQLClient } from 'graphql-request'
import getPort, { makeRange } from 'get-port'
import { server } from '../api/server'
import { join } from 'path'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'
import { db } from '../api/db'

type TestContext = {
    client: GraphQLClient,
    db: PrismaClient
}

export function createTestContext(): TestContext {
    let ctx = {} as TestContext
    const graphqlCtx = graphqlTestContext()
    const prismaCtx = prismaTestContext()

    beforeEach(async () => {
        const client = await graphqlCtx.before()
        const db = await prismaCtx.before()

        Object.assign(ctx, {
            client,
            db
        })
    })

    afterEach(async () => {
        await graphqlCtx.after()
        await prismaCtx.after()
    })

    return ctx
}

function graphqlTestContext() {
    let serverInstance: ServerInfo | null = null

    return {
        async before() {
            const port = await getPort({ port: makeRange(4000, 6000) })
            serverInstance = await server.listen({ port })
            serverInstance.server.on("close",async () => {
                db.$disconnect()
            })
            return new GraphQLClient(`http://localhost:${port}`)
        },
        async after() {
            serverInstance?.server.close()
        }
    }
}

function prismaTestContext() {
    const prismaBinary = join(__dirname, "..", "node_modules", ".bin", "prisma")
    let prismaClient: null | PrismaClient = null

    return {
        async before() {
            execSync(`${prismaBinary} db push`)
            prismaClient = new PrismaClient()
            return prismaClient
        },

        async after() {
            // await prismaClient?.$executeRaw`DROP SCHEMA IF EXISTS public CASCADE`
            return prismaClient?.$disconnect()
        }
    }
}
