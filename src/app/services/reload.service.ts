import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReloadService {

  constructor() { }
  public subscription: BehaviorSubject<null> = new BehaviorSubject<null>(null)
  
}
