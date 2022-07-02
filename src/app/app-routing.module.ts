import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { ForumPageComponent } from './pages/forum-page/forum-page.component';
import { ForumComponent } from './pages/forum/forum.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReportComponent } from './pages/report/report.component';


// Single Page Routing goes here, Add more paths if needed.
const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'feedback', component:FeedbackComponent},
  {path:'report', component:ReportComponent},
  {path:'login',component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'forum', component:ForumComponent},
  {path:'forumpage',component:ForumPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
