import { UserService } from "../services/UserService"
import { UserController } from "./UserController"
import { makeMockResponse } from "../__mocks__/mockResponse.mock"
import { Request } from "express"
import { makeMockRequest } from "../__mocks__/mockRequest.mock"

const mockUserService = {
    createUser: jest.fn(),
    getUser: jest.fn()
}


jest.mock('../services/UserService', () => {
    return {
        UserService: jest.fn().mockImplementation(() => {
            return mockUserService
        })
    }
})

describe('UserController', () => {
    

    const userController = new UserController();
    const mockResponse = makeMockResponse()

    it('Deve adicionar um novo usuário', () => {
        
        const mockRequest = {
            body: {
                name: 'Vitor',
                email: 'kvitorsantos@hotmail.com',
                password: '123456'
            }
        } as Request

        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado'})
    })


    it('Mostrar resposta de erro caso usuário não informe o name', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'kvitorsantos@hotmail.com',
                password: '12345'
            }
        } as Request

        userController.createUser(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject( {message: 'Bad request: Todos os campos são obrigatórios.'} )        
    })

    it('Mostrar resposta de erro caso usuário não informe o email', () => {
        const mockRequest = {
            body: {
                name: 'Vitor',
                email: '',
                password: '1235'
            }
        } as Request

        userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject( {message: 'Bad request: Todos os campos são obrigatórios.'} )        
    })

    it('Mostrar resposta de erro caso usuário não informe o password', () => {
        const mockRequest = {
            body: {
                name: 'Vitor',
                email: 'kvitorsantos@hotmail.com',
                password: ''
            }
        } as Request

        userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject( {message: 'Bad request: Todos os campos são obrigatórios.'} )        
    })

    it('Deve retornar o usuário com o userId informado', () => {
        const mockRequest = makeMockRequest({
            params: {
                userId: '123456',
            }
        })
        userController.getUser(mockRequest, mockResponse)
        expect(mockUserService.getUser).toHaveBeenCalledWith('123456')
        expect(mockResponse.state.status).toBe(200)
    })
})

/*    describe('UserController', () => {
        const mockUserService: Partial<UserService> = {
            deleteUser: jest.fn()
        }

        const userController = new UserController(mockUserService as UserService)

        it('Remover um usuário', () => {
            const mockRequest = {
                body: {
                    name: "Joana",
                    email: ""
                }
            } as Request

            const mockResponse = makeMockResponse()
            userController.deleteUser(mockRequest, mockResponse)

            expect(mockResponse.state.status).toBe(201)
            expect(mockResponse.state.json).toMatchObject({message: 'Usuário deletado'})

        })
    })

    describe('UserController', () => {
        const mockUserService: Partial<UserService> = {
            deleteUser: jest.fn()
        }
        const userController = new UserController(mockUserService as UserService);
    
        it('Mostrar resposta de erro caso usuário não informe o name', () => {
            const mockRequest = {
                body: {
                    name: '',
                    email: 'kvitorsantos@hotmail.com'
                }
            } as Request
    
            const mockResponse = makeMockResponse()
            userController.createUser(mockRequest, mockResponse);
            expect(mockResponse.state.status).toBe(400)
            expect(mockResponse.state.json).toMatchObject( {message: 'Bad request: name obrigatório.'} )        
        })
    })
*/