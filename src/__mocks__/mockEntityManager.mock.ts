import { EntityManager } from "typeorm";

interface MockManagerArgs {
    saveReturn?: object | [object], //sempre retorna o objeto cadastrado no banco de dados
    findOneReturn?: object
}

//ambiente de teste
export const getMockEntityManager = async ({
    saveReturn = undefined,
    findOneReturn = undefined
}: MockManagerArgs): Promise<EntityManager> => {
    const manager: Partial<EntityManager> = {}

    manager.save = jest.fn().mockImplementation(() => Promise.resolve(saveReturn))

    manager.findOne = jest.fn().mockImplementation(() => Promise.resolve(findOneReturn))

    return manager as EntityManager;
}