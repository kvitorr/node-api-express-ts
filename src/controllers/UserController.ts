import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {

    userService: UserService

    constructor(userService = new UserService()){
        this.userService = userService
    }

    createUser = (request: Request, response: Response) => {
        const user = request.body

        if(!user.name || !user.email || !user.password) {
            return response.status(400).json({ message: 'Bad request: Todos os campos são obrigatórios.'})

        }
        this.userService.createUser(user.name, user.email, user.password)
        return response.status(201).json( { message: 'Usuário criado' } )
    }

    getUser = async (request: Request, response: Response) => {
        //const users = this.userService.getUser()
        const { userId } = request.params
        const user = await this.userService.getUser(userId)

        return response.status(200).json({
            userId: user?.id_user,
            name: user?.name,
            email: user?.email
        })//.json(users)
    } 

    deleteUser = (request: Request, response: Response) => {
        const user = request.body

        if(!user.name) {
            return response.status(400).json({ message: 'Bad request: name obrigatório.'})
        }
        
        this.userService.deleteUser(user.name)

        return response.status(201).json( { message: 'Usuário deletado'} ) 
    }
}

