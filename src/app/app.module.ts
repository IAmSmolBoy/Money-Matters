import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './sharedpages/navbar/navbar.component';
import { FooterComponent } from './sharedpages/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReportComponent } from './pages/report/report.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { ForumComponent } from './pages/forum/forum.component';
import { ForumPageComponent } from './pages/forum-page/forum-page.component';
import { ProfilepageComponent } from './pages/profilepage/profilepage.component';
import { BackgroundPageComponent } from './sharedpages/background-page/background-page.component';
import { BgEffectComponent } from './sharedpages/bg-effect/bg-effect.component';
import { AuthGuard } from './services/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ReportComponent,
    RegisterComponent,
    LoginComponent,
    ForgotpasswordComponent,
    ForumComponent,
    ForumPageComponent,
    ProfilepageComponent,
    BackgroundPageComponent,
    BgEffectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
