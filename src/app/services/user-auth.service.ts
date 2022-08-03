import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }
  public currUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)
  
}
