import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;
  loginForm: FormGroup;
  private authStatusSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusLintener()
    .subscribe( authStatus => {
      this.isLoading = false;
    });

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      keepSignIn: new FormControl(true)
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get keepSignIn() {
    return this.loginForm.get('keepSignIn');
  }

  get password() {
    return this.loginForm.get('password');
  }

  revert() {
    this.loginForm.reset();
  }

  onLogin() {
    console.log(this.loginForm);
    if (this.loginForm.invalid) {
      console.log('login Form error');
      return;
    }

    this.authService.userLogin(this.email.value, this.password.value);
    this.revert();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
