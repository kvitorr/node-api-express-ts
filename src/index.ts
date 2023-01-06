import 'reflect-metadata'
import express, {Request, Response} from 'express';
import { router } from './routes';

const server = express(); //inicialização do servidor

server.use(express.json()) //indica para a aplicação que ela trabalhará com o formato json
server.use(router)
server.get('/', (request: Request, response: Response) => {
    return response.status(200).json({ message: 'DioBank API' })
})

server.listen(5000, () => console.log('Server on')) //deixa o servidor online

