import { userList } from "./mock-user"

export class User {

    id: number
    username: string
    email: string
    password: string
    role: string
    budget: number

    constructor(id: number, username: string, email: string, password: string, role: string, budget: number) {
        this.id = id
        this.username = username 
        this.email = email 
        this.password = password
        this.role = role
        this.budget = budget
    }

}