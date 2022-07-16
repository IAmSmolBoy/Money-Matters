import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ReloadService } from 'src/app/services/reload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css', '../../pages/report/report.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private us: UserService, private reload: ReloadService) { }

  ngOnInit(): void {
    this.reload.subscription.subscribe((e) => {
      this.user = this.us.getUserById(parseInt(sessionStorage.getItem("userId") || "-1"))
    })
  }

  user: User | null = this.us.getUserById(parseInt(sessionStorage.getItem("userId") || "-1" ))

}
