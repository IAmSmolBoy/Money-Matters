import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReloadService } from 'src/app/services/reload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  incorrectDetails: boolean = false
  
  constructor(private fb: FormBuilder, private us: UserService, private router: Router, private reload: ReloadService) { }

  ngOnInit(): void {
  }

  loginForm: FormGroup = this.fb.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required]],
  })

  login(): void {
    const loginVals = this.loginForm.value
    this.loginForm.reset()
    const user = this.us.getUserByUsername(loginVals.username)
    if (user !== null && loginVals.password === user.password) {
      sessionStorage.setItem("userId", user.id.toString())
      this.router.navigate(["/"])
    }
    else this.incorrectDetails = true
    this.reload.subscription.next(null)
  }

}
