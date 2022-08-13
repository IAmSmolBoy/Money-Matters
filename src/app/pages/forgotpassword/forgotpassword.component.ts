import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PassMatchValidator } from 'src/app/custom-validators/passMatchValidator.validator';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private params: ActivatedRoute, private us: UserService, private fb: FormBuilder, private router: Router) {}

  user: User | null = null
  reset: boolean = false
  showErr: boolean = false

  sendEmailForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]]
  })

  resetPassForm: FormGroup = this.fb.group({
    pass1: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
    pass2: ["", [Validators.required]],
  }, { validators: [PassMatchValidator()] })

  ngOnInit(): void {
    const token = this.params.snapshot.paramMap.get("token")
    if (token) {
      this.reset = true
      this.us.parseJWT(token).subscribe(user => {
        console.log(user)
        this.user = user
      })
    }
  }

  sendEmailSubmit(): void {
    this.us.resetPass(this.sendEmailForm.value.email).subscribe(result => {
      console.log(result)
    })
  }
  
  resetPassSubmit(): void {
    this.showErr = true
    console.log(this.user, )
    if (this.user) {
      this.us.updateUser(this.user._id?.toString() ?? "", { password: this.resetPassForm.value.pass1 }).subscribe(result => {
        console.log(result, "a")
        this.router.navigate(["/login"])
      })
    }
  }

}
