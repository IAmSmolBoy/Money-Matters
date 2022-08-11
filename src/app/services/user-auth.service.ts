import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http: HttpClient) {
    if (localStorage.getItem("jwt")) {
      this.http.post<User | null>(`/db/parseJWT`, {
        "token": localStorage.getItem("jwt")
      }).subscribe(user => {
        this.currUser.next(user)
      })
    }
  }

  public currUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)
  
}
