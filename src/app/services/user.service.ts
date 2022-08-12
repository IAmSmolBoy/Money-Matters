import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  url: string = "/db/users"

  getAllUsers = (): Observable<User[]> => this.http.get<User[]>(this.url)
  getUserById = (id: string): Observable<User | null> => this.http.get<User | null>(`${this.url}/${id}`)
  addUser = (newUser: User) => this.http.post<any>(this.url, newUser)
  updateUser = (id: string, newUser: any): Observable<{[key: string]: any}> => this.http.put(`${this.url}/${id}`, newUser)
  deleteUser = (id: string) => this.http.delete(`${this.url}/${id}`)

  //login custom route
  login = (username: string, password: string): Observable<{[key: string]: any} | null> => this.http.post<{[key: string]: any} | null>(`/db/login`, {
    "username": username,
    "password": password
  })

}