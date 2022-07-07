import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PassMatchValidator } from 'src/app/custom-validators/passMatchValidator.validator';
import { User } from 'src/app/models/user';
import { ReloadService } from 'src/app/services/reload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private us: UserService, private reload: ReloadService) { }

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
    const registerVals = this.registerForm.value
    this.us.addUser(new User(
      this.us.generateId(),
      registerVals.username,
      registerVals.email,
      registerVals.passwords.pass1,
      "User"
    ))
    this.reload.subscription.next(null)
  }

}
