import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PassMatchValidator } from 'src/app/custom-validators/passMatchValidator.validator';
import { User } from 'src/app/models/user';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private us: UserService, private ua: UserAuthService, private router: Router) { }

  ngOnInit(): void {
  }

  registerForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    username: ["", [Validators.required]],
    passwords: this.fb.group({
      pass1: ["", [Validators.required]],
      pass2: ["", [Validators.required]],
    }, { validators: [PassMatchValidator()] })
  })

  register(): void {
    const registerVals = this.registerForm.value,
    newUser = new User(registerVals.username, registerVals.email, registerVals.passwords.pass1, "User", 0)
    this.us.addUser(newUser).subscribe(userId => {
      newUser._id = userId["insertedId"]
      newUser.pfp = "https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_960_720.png"
      newUser.socials = {
          facebook: "https://www.facebook.com/",
          github: "https://github.com/",
          linkedIn: "https://www.linkedin.com/",
          instagram: "https://www.instagram.com/",
      }
      this.ua.currUser.next(newUser)
    })
    this.router.navigate(["/"])
  }

}
