import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeInterval } from 'rxjs';
import { User } from 'src/app/models/user';
import { FeedbackService } from 'src/app/services/feedback.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css']
})
export class ProfilepageComponent implements OnInit {

  constructor(private params: ActivatedRoute, private us: UserService, private document: ElementRef, private fb: FormBuilder, private ua: UserAuthService,
    private router: Router, private fs: FeedbackService, private ts: TransactionService) { }

  ngAfterViewInit() {
    this.text = (<HTMLElement>this.document.nativeElement).getElementsByClassName('front_text')[0]
    this.pfpImage = (<HTMLElement>this.document.nativeElement).getElementsByClassName('front_face-photo')[0]
  }

  ngOnInit(): void {
    this.us.getUserById(this.params.snapshot.paramMap.get("id") ?? "").subscribe(user => {
      this.user = user
      this.ua.currUser.subscribe(user => {
        this.currUser = user
        this.own = (this.currUser?._id ?? "") === (this.user?._id ?? "a")
        this.pfp = this.user?.pfp ?? ""
        if (this.own) {
          this.editForm = this.fb.group({
            username: [this.user?.username ?? "", [Validators.required]],
            email: [this.user?.email ?? "", [Validators.required, Validators.email]],
            password: ["", [Validators.required]],
            fb: [this.user?.socials.facebook ?? "https://facebook.com/"],
            github: [this.user?.socials.github ?? "https://github.com/"],
            linkedIn: [this.user?.socials.linkedIn ?? "https://linkedin.com/"],
            ig: [this.user?.socials.instagram ?? "https://instagram.com/"],
          })
        }
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
  pfpImage: any
  blockInterval: any

  onHover(): void {
    clearInterval(this.blockInterval)
    setTimeout(() => {
      this.text.style.display = "none"
      this.pfpImage.style.display = "none"
    }, 600);
  }

  noHover(): void {
    this.blockInterval = setInterval(() => {
      this.pfpImage.style.display = "block"
      this.text.style.display = "block"
    }, 10);
  }

  //for edit profile form
  pfp: string = ""
  hideSocials: boolean = true
  editForm: FormGroup = this.fb.group({
    username: [this.user?.username ?? "", [Validators.required]],
    email: [this.user?.email ?? "", [Validators.required, Validators.email]],
    password: ["", []],
    fb: [this.user?.socials.facebook ?? "https://facebook.com/"],
    github: [this.user?.socials.github ?? "https://github.com/"],
    linkedIn: [this.user?.socials.linkedIn ?? "https://linkedin.com/"],
    ig: [this.user?.socials.instagram ?? "https://instagram.com/"],
  })
  editFormShowHide(): void {
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
      this.user?.role ?? "",
      this.user?.budget ?? 0,
      {
        pfp: this.pfp,
        socials: {
          facebook: formVals.facebook,
          github: formVals.github,
          linkedIn: formVals.linkedIn,
          instagram: formVals.instagram,
        },
      }
    )
    if (formVals.password !== null && formVals.password !== "") {
      newUser.password = formVals.password
    }
    this.us.updateUser(this.currUser?._id?.toString() ?? "", newUser).subscribe(res => {
      localStorage.setItem("jwt", res.token)
    })
    newUser._id = this.currUser?._id
    this.ua.currUser.next(newUser)
    this.user = newUser
    this.showEditForm = false
  }

  deleteProfile(): void {
    const userId = this.user?._id?.toString() ?? ""
    this.us.deleteUser(userId).subscribe(result => {
      if (result === "Success") {
        this.ua.currUser.next(null)
        localStorage.clear()
        this.router.navigate(["/"])
      }
      else {
        console.log(result)
      }
    })
  }

}
