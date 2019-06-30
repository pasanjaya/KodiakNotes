import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register/register.component';
import { LoginComponent } from './login/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { StatComponent } from './dashboard/dashboard/statistics/stat/stat.component';
import { UserDbComponent } from './dashboard/dashboard/userDb/user-db/user-db.component';
import { FeedbackComponent } from './dashboard/dashboard/feedback/feedback/feedback.component';


const routes: Routes = [
    {path: '' , component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'dashboard/stat', component: StatComponent},
    {path: 'dashboard/db', component: UserDbComponent},
    {path: 'dashboard/feedbacks', component: FeedbackComponent}
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
