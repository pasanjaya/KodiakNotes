import { Component, OnInit } from '@angular/core';
import { UserDbService } from '../../user-db.service';

@Component({
  selector: 'app-user-db',
  templateUrl: './user-db.component.html',
  styleUrls: ['./user-db.component.css']
})
export class UserDbComponent implements OnInit {

  constructor(private userDbService: UserDbService) { }

  users: any;
  ngOnInit() {
    this.userDbService.getUsers().subscribe(data=>{
      console.log(data);
      this.users = data;
    })
  }

}
