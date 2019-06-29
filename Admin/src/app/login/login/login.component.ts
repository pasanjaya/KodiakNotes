import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators, FormControl} from '@angular/forms';
import {Login} from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  submitted= false;

  constructor(
    private formBuider: FormBuilder,

  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      
      email: new FormControl(null,[Validators.required]),
      password: new FormControl(null,[Validators.required])

     });
    }

  onSubmit(){
    
    this.submitted = true;

    if(this.loginForm.invalid){
      console.log("error")
      return;
    }
    var loginDetails: Login = {
      email: this.loginForm.get('email').value,
      password:  this.loginForm.get('password').value
    }
    console.log(loginDetails);
    
  }

}
