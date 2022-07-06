import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumPageComponent } from './pages/forum-page/forum-page.component';
import { ForumComponent } from './pages/forum/forum.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfilepageComponent } from './pages/profilepage/profilepage.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReportComponent } from './pages/report/report.component';
import { ViewProfileComponent } from './pages/view-profile/view-profile.component';


// Single Page Routing goes here, Add more paths if needed.
const routes: Routes = [
  {path: '', redirectTo: "home", pathMatch: "full"},
  {path: 'home', component: HomeComponent},
  {path: 'report', component: ReportComponent},
  {path: 'login',component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profilepage', component:ProfilepageComponent},
  {path: 'forum', component: ForumComponent},
  {path: 'viewcomments/:id',component: ForumPageComponent},
  {path: 'viewprofile/:id',component: ViewProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
