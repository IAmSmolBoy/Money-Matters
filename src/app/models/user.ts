import { ObjectId } from "mongodb"

interface Socials {
    [key: string]: string
}

export class User {

    _id?: ObjectId
    username: string
    email: string
    password?: string
    role: string
    budget: number
    pfp: string
    socials: Socials

    constructor(username: string, email: string, role: string, budget: number, para: {pfp?: string, socials?: Socials, password?: string, id?: ObjectId}) {
        this._id = para.id
        this.username = username 
        this.email = email 
        this.password = para.password
        this.role = role
        this.budget = budget
        this.pfp = para.pfp || "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_960_720.png"
        this.socials = para.socials || {
            facebook: "https://www.facebook.com/",
            github: "https://github.com/",
            linkedIn: "https://www.linkedin.com/",
            instagram: "https://www.instagram.com/",
        }
    }

}