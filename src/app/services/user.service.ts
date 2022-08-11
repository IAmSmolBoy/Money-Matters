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
  updateUser = (id: string, newUser: any) => this.http.put(`${this.url}/${id}`, newUser)
  deleteUser = (id: string) => this.http.delete(`${this.url}/${id}`)
  login = (username: string, password: string): Observable<User | null> => this.http.post<User | null>(`/db/login`, {
    "username": username,
    "password": password
  })

}