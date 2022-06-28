import { userList } from "./mock-user"

export class User {

    id: number
    username: string
    email: string
    password: string

    constructor(username: string, email: string, password: string) {
        this.id = userList.length === 0 ? 1 : userList[userList.length - 1].id + 1
        this.username = username 
        this.email = email 
        this.password = password 
    }

}