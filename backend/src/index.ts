import "dotenv/config"
import Fastify from 'fastify'

const fastify = Fastify({
  logger: true
})


fastify.get('/', function (request, reply) {
  reply.send({ hello: 'worldavid' })
})

fastify.listen({ port: Number(process.env.PORT) ?? 8081}, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})