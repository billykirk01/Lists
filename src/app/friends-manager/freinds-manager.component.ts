import { Component, Inject } from '@angular/core';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { user } from 'src/models/user';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-friends-manager',
  templateUrl: './friends-manager.component.html',
  styleUrls: ['./friends-manager.component.css']
})
export class FriendsManagerComponent {

  constructor(private database: AuthService, private bottomSheet: MatBottomSheet, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {

  }

  addFriend(user: user) {
    this.bottomSheet.open(AddFriendComponent, {
      data: {
        user: user
      }
    });
  }

  removeFriend(friend: user) {
    this.database.removeFriend(this.data.user, friend.uid);
  }

  acceptRequest(friend: user) {
    this.database.acceptFriendRequest(this.data.user, friend.uid);
  }

  declineRequest(friend: user) {
    this.database.declineFriendRequest(this.data.user, friend.uid);
  }
}
