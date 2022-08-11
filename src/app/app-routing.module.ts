import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { ForumPageComponent } from './pages/forum-page/forum-page.component';
import { ForumComponent } from './pages/forum/forum.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfilepageComponent } from './pages/profilepage/profilepage.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReportComponent } from './pages/report/report.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: "home", pathMatch: "full"},
  {path: 'home', component: HomeComponent},
  {path: 'report', component: ReportComponent, canActivate: [AuthGuard]},
  {path: 'login',component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'profilepage/:id', component:ProfilepageComponent, canActivate: [AuthGuard]},
  {path: 'forum', component: ForumComponent},
  {path: 'viewcomments/:id',component: ForumPageComponent},
  {path: 'forgetpassword/:token',component: ForgotpasswordComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
