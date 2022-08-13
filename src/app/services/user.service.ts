import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { dictionary } from "../models/interfaces"

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  url: string = "/db/users"

  getAllUsers = (): Observable<User[]> => this.http.get<User[]>(this.url)
  getUserById = (id: string): Observable<User | null> => this.http.get<User | null>(`${this.url}/${id}`)
  addUser = (newUser: User) => this.http.post<any>(this.url, newUser)
  updateUser = (id: string, newUser: dictionary | User): Observable<dictionary | null> => this.http.put<dictionary | null>(`${this.url}/${id}`, newUser)
  deleteUser = (id: string) => this.http.delete(`${this.url}/${id}`)

  //login and reset password custom route
  login = (username: string, password: string): Observable<dictionary | null> => this.http.post<dictionary | null>(`/db/login`, {
    "username": username,
    "password": password
  })
  parseJWT = (jwt: string): Observable<User> => this.http.post<User>(`/db/parseJWT`, {
    "token": jwt
  })
  resetPass = (email: string): Observable<string> => this.http.post<string>("/db/resetpassword", {
    email: email
  })

}