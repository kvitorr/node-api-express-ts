import { Router } from 'express'
import { UserController } from './controllers/UserController';

export const router = Router();
const userController = new UserController();

router.post('/user', userController.createUser) //não precisa de parametro
//pq retornará erro, já que utilizaremos os parâmetros padrão: request, response.

router.get('/user', userController.getAllUsers)

router.delete('/user', userController.deleteUser)