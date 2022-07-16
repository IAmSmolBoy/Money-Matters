import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  editForm: FormGroup = this.fb.group({
    
  })

  updateProfile(): void {
    
  }

}
