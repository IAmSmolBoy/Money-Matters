import { Injectable } from '@angular/core';
import { userList } from './models/mock-user';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getAllUsers = (): User[] => userList

  addUser = (newUser: User) => userList.push(newUser)

  updateUser = (oldUserIndex: number, newUser: User) => userList[oldUserIndex] = newUser

  deleteUser = (delUserIndex: number) => userList.splice(delUserIndex, 1)
  
}
