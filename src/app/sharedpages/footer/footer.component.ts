import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css', '../../pages/report/report.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private us: UserService, private ua: UserAuthService) { }

  user: User | null = null

  ngOnInit(): void {
    this.ua.currUser.subscribe(user => this.user = user)
  }

}
