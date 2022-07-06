import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PassMatchValidator } from 'src/app/custom-validators/passMatchValidator.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

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

}
