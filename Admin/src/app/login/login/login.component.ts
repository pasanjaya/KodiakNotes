import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import {FormBuilder,FormGroup,Validators, FormControl} from '@angular/forms';
import {Login} from './login.model';
import {RegisterService} from '../../register/register.service'
import { Router } from '@angular/router';


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
    private registerService: RegisterService,
    private router: Router

  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      
      email: new FormControl(null,[Validators.required]),
      password: new FormControl(null,[Validators.required])

     });
    }

  onSubmit(){
    
    this.submitted = true;
    console.log("submitted");

    if(this.loginForm.invalid){
      console.log("error")
      return;
    }
    var loginDetails: Login = {
      email: this.loginForm.get('email').value,
      password:  this.loginForm.get('password').value
    }
    console.log(loginDetails);
    this.registerService.authenticateAdmin(loginDetails).subscribe(data=>{
      console.log(typeof(data));
      if(data!= null ){
          localStorage.setItem("logValue","true");
          console.log("if condition")
          this.router.navigate(["/dashboard"]);
          
      }
    })
    
  }

}
