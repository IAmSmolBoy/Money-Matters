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

  userList: User[] = []
  usernameTaken: boolean = false
  emailTaken: boolean = false
  showErr: boolean = false

  ngOnInit(): void {
    this.us.getAllUsers().subscribe(users => {
      this.userList = users
    })
  }

  registerForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    username: ["", [Validators.required, Validators.minLength(6), Validators.minLength(20)]],
    passwords: this.fb.group({
      pass1: ["", [Validators.required, Validators.minLength(6), Validators.minLength(40)]],
      pass2: ["", [Validators.required]],
    }, { validators: [PassMatchValidator()] })
  })

  register(): void {
    this.showErr = true
    if (this.registerForm.valid) {
      const registerVals = this.registerForm.value,
      newUser = new User(registerVals.username, registerVals.email, registerVals.passwords.pass1, "User", 0)
      this.usernameTaken = this.userList.some(user => user.username === registerVals.username)
      this.emailTaken = this.userList.some(user => user.email === registerVals.email)
      if (!this.usernameTaken && !this.emailTaken) {
        this.us.addUser(newUser).subscribe(userId => {
          newUser._id = userId["token"]
          this.ua.currUser.next(newUser)
          localStorage.setItem("jwt", userId["token"])
        })
        this.router.navigate(["/"])
      }
    }
  }

}
