import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { user } from 'src/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: user;

  friends: Observable<user[]>;
  pendingFriends: Observable<user[]>;


  constructor(public auth: AuthService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.fetchLoggedInUser();
  }

  logIn() {
    this.auth.googleLogin();
    this.fetchLoggedInUser();
  }

  logOut() {
    this.auth.signOut();
  }

  fetchLoggedInUser() {
    this.auth.user.subscribe(
      user => {
        this.user = user
        this.auth.getFriends(user)
        this.friends = this.auth.friends;
        this.auth.getPendingFriends(user)
        this.pendingFriends = this.auth.pendingFriends;
      }
    );
  }

}
