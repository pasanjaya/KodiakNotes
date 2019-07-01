import { Component, OnInit } from '@angular/core';
import { UserDbComponent } from './userDb/user-db/user-db.component';
import { UserDbService } from './user-db.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
