import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { user } from 'src/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: user;

  constructor(private auth: AuthService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.fetchLoggedInUser();
  }

  logIn() {
    this.auth.googleLogin();
    this.fetchLoggedInUser();
  }

  private fetchLoggedInUser() {
    this.auth.user.subscribe(user => this.user = user);
  }

}
