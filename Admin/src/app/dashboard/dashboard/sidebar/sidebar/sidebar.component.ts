import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) { }

  isLoggedin:any;
  ngOnInit() {
    this.isLoggedin=localStorage.getItem("logValue");
    console.log(this.isLoggedin);
  }

  logOut(){
    localStorage.setItem("logValue","false");
    this.router.navigate(["/"]);
    
  }

}
