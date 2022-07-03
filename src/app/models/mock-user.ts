import { User } from "./user";

export const userList: User[] = []
userList.push(new User(1, "Admin", "moneymatters@gmail.com", "Admin", "Owner"))
userList.push(new User(2, "test", "test@gmail.com", "test", "testRole"))