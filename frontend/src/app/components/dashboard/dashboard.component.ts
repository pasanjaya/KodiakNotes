import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  list: [1,2, 'e2e2e2sfsf', 'wdwd'];
  constructor() { }

  ngOnInit() {
  }

}
