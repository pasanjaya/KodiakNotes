import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators, FormBuilder} from '@angular/forms';
import {Registration} from './register.model';
import {PasswordMatch} from './passwordvalidation';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
     
      email:  new FormControl(null,[Validators.required, Validators.email]),
        password:  new FormControl(null,[Validators.required,Validators.minLength(8)]),
        Confirmpassword: new FormControl(null,[Validators.required, Validators.minLength(8)]),
    },
    {
      validator: PasswordMatch.matchPassword
  }
    );
  }

  // confirmPasswordValidator(passGrup: FormGroup): { [s: string]: boolean } {
  //   const password = passGrup.get('password');
  //   const confirm = passGrup.get('ConfirmPassword');
  //   if (!password.value || !confirm.value) { return null; }
  //   return password.value === confirm.value ? null : { passwordMismatched: true };
  // }

  onRegister(){
    if(this.registerForm.invalid){
      console.log("error")
      console.log(this.registerForm)
      return;
    }

    var registrationDetails: Registration= {
    
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
      confirmpassword: this.registerForm.get('Confirmpassword').value

    }
    console.log(registrationDetails);
  }

}
