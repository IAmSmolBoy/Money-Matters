import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {

  constructor(private params: ActivatedRoute, private us: UserService, private document: ElementRef, private fb: FormBuilder) { }

  ngAfterViewInit() {
    this.text = (<HTMLElement>this.document.nativeElement).getElementsByClassName('front_text')[0]
  }

  ngOnInit(): void { 
  }

  //get user info, own is whether this is the user's own profile
  user: User = this.us.getUserById(parseInt(this.params.snapshot.paramMap.get("id") || "-1")) || new User(-1, "", "", "", "", -1)
  own: boolean = parseInt(sessionStorage.getItem("userId")|| "-1") === this.user.id
  showEditForm: boolean = false

  //to support hover animation
  text: any

  onHover(): void {
    setTimeout(() => {
      this.text.style.display = "none"
    }, 600);
  }

  noHover(): void {
    this.text.style.display = "block"
    setTimeout(() => {
      this.text.style.display = "block"
    }, 600);
  }

  //for edit profile form
  pfp: string = this.user.pfp
  hideSocials: boolean = true
  editForm: FormGroup = this.fb.group({
    username: [this.user.username, [Validators.required]],
    email: [this.user.email, [Validators.required, Validators.email]],
    password: [this.user.password, [Validators.required]],
    fb: [this.user.socials.facebook],
    github: [this.user.socials.github],
    linkedIn: [this.user.socials.linkedIn],
    ig: [this.user.socials.instagram],
  })

  //edit profile functions
  onUploadImg(e: any): void {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.pfp = `${reader.result}` || ""
    };
  }
  updateProfile(): void {
    const formVals = this.editForm.value,
    newUser = new User(
      this.user.id,
      formVals.username,
      formVals.email,
      formVals.passowrd,
      this.user.role,
      this.user.budget,
      this.pfp,
      {
        facebook: formVals.facebook,
        github: formVals.github,
        linkedIn: formVals.linkedIn,
        instagram: formVals.instagram,
      }
    )
    this.us.updateUser(this.us.getAllUsers().indexOf(this.user), newUser)
    this.user = newUser
    this.showEditForm = false
  }

}
