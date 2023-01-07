import { Router } from 'express'
import { LoginController } from './controllers/LoginController';
import { UserController } from './controllers/UserController';

export const router = Router();

const userController = new UserController();
const loginController = new LoginController();
router.post('/user', userController.createUser) //não precisa de parametro
//pq retornará erro, já que utilizaremos os parâmetros padrão: request, response.
router.get('/user', userController.getUser)
router.delete('/user', userController.deleteUser)

router.post('/login', loginController.login)