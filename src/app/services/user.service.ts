import { Injectable } from '@angular/core';
import { userList } from '../models/mock-user';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  generateId = (): number => userList.length === 0 ? 1 : userList[userList.length - 1].id + 1

  getUserById = (userId: number): User | null => userList.some(user => user.id === userId) ? 
  userList.filter(user => user.id === userId)[0] : null

  getUserByUsername = (username: string): User | null => userList.some(user => user.username === username) ? 
  userList.filter(user => user.username === username)[0] : null

  getAllUsers = (): User[] => userList

  addUser = (newUser: User) => userList.push(newUser)

  updateUser = (oldUserIndex: number, newUser: User) => userList[oldUserIndex] = newUser

  deleteUser = (delUserIndex: number) => userList.splice(delUserIndex, 1)
  
}
