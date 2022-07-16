import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ReloadService } from 'src/app/services/reload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isCollapsed = true;
  constructor(private reload: ReloadService, private us: UserService, private router: Router) {

  }

  signedIn: boolean = false
  user: User | null = null

  ngOnInit(): void {
    this.reload.subscription.subscribe((e) => {
      this.signedIn = sessionStorage.getItem("userId") !== null
      this.user = this.us.getUserById(parseInt(sessionStorage.getItem("userId") || ""))
    })
  }

  signOut(): void {
    sessionStorage.removeItem("userId")
    this.signedIn = false
    this.router.navigate(["/"])
    this.reload.subscription.next(null)
  }

}
