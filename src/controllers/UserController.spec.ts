import { UserService } from "../services/UserService"
import { UserController } from "./UserController"
import { makeMockResponse } from "../__mocks__/mockResponse.mock"
import { Request } from "express"



describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn() //simula a chamada da função
    }

    const userController = new UserController(mockUserService as UserService);

    it('Deve adicionar um novo usuário', () => {
        
        const mockRequest = {
            body: {
                name: 'Vitor',
                email: 'kvitorsantos@hotmail.com'
            }
        } as Request

        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado'})
    })
})

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn()
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

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn()
    }
    const userController = new UserController(mockUserService as UserService)

    it('Mostrar resposta de erro caso usuário não informe o email', () => {
        const mockRequest = {
            body: {
                name: 'Vitor',
                email: ''
            }
        } as Request

        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject( {message: 'Bad request: email obrigatório.'} )
    })
})

describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        getAllUsers: jest.fn() //simula a chamada da função
    }

    const userController = new UserController(mockUserService as UserService);

    it('Deve mostrar todos os usuários', () => {
        const mockRequest = {
            body: {}
        } as Request

        const mockResponse = makeMockResponse();
        userController.getAllUsers(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(200)
    })

    describe('UserController', () => {
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




})