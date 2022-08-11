import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isCollapsed = true;
  constructor(private userAuth: UserAuthService, private us: UserService, private router: Router) {

  }

  signedIn: boolean = false
  user: User | null = null

  ngOnInit(): void {
    this.userAuth.currUser.subscribe(user => {
      this.signedIn = user !== null
      this.user = user
    })
  }

  signOut(): void {
    this.signedIn = false
    this.router.navigate(["/"])
    this.userAuth.currUser.next(null)
    localStorage.clear()
  }

}
