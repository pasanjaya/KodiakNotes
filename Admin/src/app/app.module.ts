import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { NavbarComponent } from './dashboard/dashboard/navbar/navbar/navbar.component';
import { SidebarComponent } from './dashboard/dashboard/sidebar/sidebar/sidebar.component';
import { StatComponent } from './dashboard/dashboard/statistics/stat/stat.component';
import { UserDbComponent } from './dashboard/dashboard/userDb/user-db/user-db.component';
import { FeedbackComponent } from './dashboard/dashboard/feedback/feedback/feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    StatComponent,
    UserDbComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
