import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor( private us: UserService) {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      this.us.parseJWT(jwt).subscribe(user => {
        this.currUser.next(user)
      })
    }
  }

  public currUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)
  
}
