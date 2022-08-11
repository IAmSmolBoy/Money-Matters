import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './services/user-auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private ua: UserAuthService, private us: UserService) {  }

  ngOnInit() {
    const userId = localStorage.getItem("userId") ?? ""
    console.log(userId)
    if (userId !== "") this.us.getUserById(userId).subscribe(user => this.ua.currUser.next(user))
  }
}
