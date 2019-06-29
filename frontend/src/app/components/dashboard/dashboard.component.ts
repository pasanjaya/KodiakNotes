import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  list = [1, 2, 'e2e2e2sfsf', 'wdwd', 34, 4534, 343, 3434, 43453, 4535];
  constructor() { }

  ngOnInit() {
  }

}
