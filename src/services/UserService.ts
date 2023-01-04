export interface User {
    name: string; 
    email: string;
}

const db = [
    {
        name: "Joana",
        email: "Joana@dio.com",
    }
]

export class UserService {
    db: User[];

    constructor(database = db){
        this.db = database
    }

    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        }

        this.db.push(user)
        console.log('DB atualizado', this.db)
    }

    getAllUsers = () => {
        return this.db;
    }

    deleteUser = (name: string) => {
        const id: number = this.findIdUserByName(name)

        if(id === -1){
            return;
        }

        this.db.splice(id, 1);
    }

    findIdUserByName = (name: string): number => {
        for (let i = 0; i < this.db.length; i++) {
            if(this.db[i].name === name) {
                return i
            } 
        }
        return -1;
    }
}