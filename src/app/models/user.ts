import { userList } from "./mock-user"

export class User {

    id: number
    username: string
    email: string
    password: string
    role: string
    budget: number
    pfp?: string
    socials: {
        [key: string]: string
    } = {
        facebook: "https://www.facebook.com/",
        github: "https://github.com/",
        linkedIn: "https://www.linkedin.com/",
        instagram: "https://www.instagram.com/",
    }

    constructor(id: number, username: string, email: string, password: string, role: string, budget: number, pfp?: string) {
        this.id = id
        this.username = username 
        this.email = email 
        this.password = password
        this.role = role
        this.budget = budget
        this.pfp = pfp || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }

}