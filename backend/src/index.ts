import 'dotenv/config';
import Fastify from 'fastify';
import {
    jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';
import z from 'zod';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';

const app = Fastify({
  logger: true,
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Treino API',
      description: 'API para o sistema de treino',
      version: '1.0.0',
    },
    servers: [
      {
        description: 'Localhost',
        url: 'http://localhost:8081',
      },
    ],
  },
  transform: jsonSchemaTransform,
});

await app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

app.withTypeProvider<ZodTypeProvider>().route({
  method: 'GET',
  url: '/',
  schema: {
    description: 'Hello World endpoint',
    tags: ['Hello word'],
    response: {
      200: z.object({
        message: z.string(),
      }),
    },
  },
  handler: () => {
    return {
      message: 'Hello World',
    };
  },
});

try {
  await app.listen({ port: Number(process.env.PORT) ?? 8081 });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
