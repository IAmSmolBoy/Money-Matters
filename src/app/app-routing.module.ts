import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { HomeComponent } from './pages/home/home.component';
import { ReportComponent } from './pages/report/report.component';


// Single Page Routing goes here, Add more paths if needed.
const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'feedback', component:FeedbackComponent},
  {path:'report', component:ReportComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
