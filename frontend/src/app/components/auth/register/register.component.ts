import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  isLoading = false;
  userRegForm: FormGroup;
  private authStatusSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusLintener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });

    this.userRegForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      userPassword: new FormGroup({
        password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(8)])
      }, [Validators.required, this.confirmPasswordValidator])
    });
  }

  get email() {
    return this.userRegForm.get('email');
  }

  get password() {
    const password = this.userRegForm.get('userPassword.password');
    const confirm = this.userRegForm.get('userPassword.confirmPassword');
    if (password.value === confirm.value) {
      return password;
    }
  }

  confirmPasswordValidator(passGrup: FormGroup): { [s: string]: boolean } {
    const password = passGrup.get('password');
    const confirm = passGrup.get('confirmPassword');
    if (!password.value || !confirm.value) {
      return null;
    }
    return password.value === confirm.value
      ? null
      : { passwordMismatched: true };
  }

  revert() {
    this.userRegForm.reset();
  }

  onRegister() {
    console.log(this.userRegForm);
    if (this.userRegForm.invalid) {
      console.log('Form Invalid');
      return;
    }
    this.authService.userRegister(this.email.value, this.password.value);
    this.revert();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
