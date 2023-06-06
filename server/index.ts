import fastify from "fastify";
import fastifyStatic from '@fastify/static'
import path from 'path'

const server = fastify();

server.register(fastifyStatic, {
  root: path.join(__dirname, './static')
});

server.get('/', (request, reply) => {
  reply.sendFile('index.html')
});


(async () => {

  server.listen({ port: 3336 }, (err) => {

    if (err) {
      console.log(err)
      return
    }

    console.log('Server online!')
  })

})()
