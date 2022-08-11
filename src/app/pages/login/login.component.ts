import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  incorrectDetails: boolean = false
  submitted: boolean = false
  
  constructor(private fb: FormBuilder, private us: UserService, private router: Router, private ua: UserAuthService) { }

  ngOnInit(): void {
  }

  loginForm: FormGroup = this.fb.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required]],
  })

  login(): void {
    this.submitted = true
    const loginVals = this.loginForm.value
    this.us.login(loginVals.username, loginVals.password).subscribe(user => {
      if (user !== null) {
        localStorage.setItem("jwt", user.token ?? "")
        delete user.token
        this.ua.currUser.next(user as User)
        this.ua.signedIn.next(true)
        this.router.navigate(["/"])
        this.loginForm.reset()
      }
      else {
        this.incorrectDetails = true
      }
    })
    console.log(this.incorrectDetails, this.submitted);
    
  }

}
