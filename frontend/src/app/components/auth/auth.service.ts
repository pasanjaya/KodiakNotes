import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private id: string;
  private isAuthenticated = false;

  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getAuthStatusLintener() {
    return this.authStatusListener.asObservable();
  }

  userRegister(email: string, password: string) {
    const userData = {
      email,
      password,
    };

    this.http
      .post('http://localhost:8080/saveUser', userData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/']);
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  userLogin(email: string, password: string) {
    const helper = new JwtHelperService();
    const userLoginData = { email, password };
    this.http
      .post<{ token: string, expiresIn: number }>(
        'http://localhost:8080/authenticate',
        userLoginData
      )
      .subscribe(response => {
        console.log(response);
        const token = response.token;
        this.token = token;
        if (token) {
          const decodedToken = helper.decodeToken(token);
          const id = decodedToken.userId;
          this.id = id;
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.saveAuthData(token);
          this.router.navigate(['/dashboard', id]);
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const helper = new JwtHelperService();
    this.token = authInformation.token;
    const decodedToken = helper.decodeToken(this.token);
    this.id = decodedToken.userId;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  userLogout() {
    this.token = null;
    this.id = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private saveAuthData(token: string) {
    localStorage.setItem('token', token);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    return {
      token
    };
  }

}
