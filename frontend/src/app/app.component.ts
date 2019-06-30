import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fadeAnimation } from './animations/router-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {
  title = 'KodiakNotes';

  constructor(private router: Router) {}

  isLoginPage() {
    return this.router.url === '/';
  }
}
