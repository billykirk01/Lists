import { Component, Inject } from '@angular/core';
import { user } from 'src/models/user';
import { AuthService } from 'src/app/core/auth.service';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-current-friends',
  templateUrl: './current-friends.component.html',
  styleUrls: ['./current-friends.component.css']
})
export class CurrentFriendsComponent {

  friends: Observable<user[]>

  constructor(private auth: AuthService, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.friends = this.auth.getFriends(this.data.user);
  }

  removeFriend(friend: user) {
    this.auth.removeFriend(this.data.user, friend.uid);
  }

}
