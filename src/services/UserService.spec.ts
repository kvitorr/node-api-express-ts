import { UserService } from "./UserService"
import * as jwt from 'jsonwebtoken'

jest.mock("../repositories/UserRepository")
jest.mock("../database", () => {
    initialize: jest.fn()
})

jest.mock('jsonwebtoken')

const mockUserRepository = require("../repositories/UserRepository")

const mockUser = {
    id_user: '123456',
    name: 'nath',
    email: 'nath@test.com',
    password: '12345'
}

describe('UserService', () => {

    const userService = new UserService(mockUserRepository)
    it('Deve adicionar um novo usuário', async () => {

        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(mockUser))

        const response = await userService.createUser('nath', 'nath@test.com', '12345')
        expect(mockUserRepository.createUser).toHaveBeenCalled()
        expect(response).toMatchObject({
            id_user: '123456',
            name: 'nath',
            email: 'nath@test.com',
            password: '12345'
        })
    })

    it('Devo retornar um token de usuário', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(mockUser))
        jest.spyOn(jwt, 'sign').mockImplementation(() => 'token')
        const token = await userService.getToken('nath@test.com', '123456')

        expect(token).toBe('token')
    })

    it('Deve retornar um erro, caso não encontre um usuário', async () => {
        jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(null))

        await expect(userService.getToken('invalid@test.com', '123456')).rejects.toThrowError(new Error('Email/password invalid!'))
    })
})