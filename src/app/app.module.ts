import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './sharedpages/navbar/navbar.component';
import { FooterComponent } from './sharedpages/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { ReportComponent } from './pages/report/report.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { ForumComponent } from './pages/forum/forum.component';
import { ForumPageComponent } from './pages/forum-page/forum-page.component';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';
import { ProfilepageComponent } from './pages/profilepage/profilepage.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    FeedbackComponent,
    ReportComponent,
    RegisterComponent,
    LoginComponent,
    ForgotpasswordComponent,
    ForumComponent,
    ForumPageComponent,
    ViewProfileComponent,
    ProfilepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
