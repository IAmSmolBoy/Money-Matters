import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TimeInterval } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {

  constructor(private params: ActivatedRoute, private us: UserService, private document: ElementRef, private fb: FormBuilder, private ua: UserAuthService) { }

  ngAfterViewInit() {
    this.text = (<HTMLElement>this.document.nativeElement).getElementsByClassName('front_text')[0]
  }

  ngOnInit(): void {
    console.log(this.params.snapshot.paramMap.get("id"), "aa")
    this.us.getUserById(this.params.snapshot.paramMap.get("id") ?? "").subscribe(user => {
      this.user = user
      this.ua.currUser.subscribe(user => {
        this.currUser = user
        this.own = (this.currUser?._id ?? "") === (this.user?._id ?? "a")
      })
    })
    this.blockInterval = setInterval(() => {
      this.text.style.display = "block"
    }, 10);
  }

  //get user info, own is whether this is the user's own profile
  user: User | null = null
  currUser: User | null = null
  own: boolean = (this.currUser?._id ?? "") === (this.user?._id ?? "a")
  showEditForm: boolean = false

  //to support hover animation
  text: any
  blockInterval: any

  onHover(): void {
    clearInterval(this.blockInterval)
    setTimeout(() => {
      this.text.style.display = "none"
    }, 600);
  }

  noHover(): void {
    this.blockInterval = setInterval(() => {
      this.text.style.display = "block"
    }, 10);
  }

  //for edit profile form
  pfp: string = this.user?.pfp ?? ""
  hideSocials: boolean = true
  editForm: FormGroup = this.fb.group({
    username: [this.user?.username ?? "", [Validators.required]],
    email: [this.user?.email ?? "", [Validators.required, Validators.email]],
    password: [this.user?.password ?? "", [Validators.required]],
    fb: [this.user?.socials.facebook ?? "https://facebook.com/"],
    github: [this.user?.socials.github ?? "https://github.com/"],
    linkedIn: [this.user?.socials.linkedIn ?? "https://linkedin.com/"],
    ig: [this.user?.socials.instagram ?? "https://instagram.com/"],
  })
  editFormShowHide(): void {
    console.log("Oi its work")
    this.showEditForm = !this.showEditForm
  }

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
      formVals.username,
      formVals.email,
      formVals.passowrd,
      this.user?.role ?? "",
      this.user?.budget ?? 0,
      this.pfp,
      {
        facebook: formVals.facebook,
        github: formVals.github,
        linkedIn: formVals.linkedIn,
        instagram: formVals.instagram,
      },
      this.currUser?._id
    )
    this.us.updateUser(this.currUser?._id?.toString() ?? "", newUser)
    this.user = newUser
    this.showEditForm = false
  }

}
