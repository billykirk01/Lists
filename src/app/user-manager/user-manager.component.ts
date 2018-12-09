import { Component, Inject } from '@angular/core';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { AuthService } from '../core/auth.service';
import { PendingRequestsComponent } from './pending-requests/pending-requests.component';
import { CurrentFriendsComponent } from './current-friends/current-friends.component';
import { Observable } from 'rxjs';
import { user } from 'src/models/user';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent {

  pendingFriends: Observable<user[]>;

  constructor(private auth: AuthService, private bottomSheet: MatBottomSheet, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.pendingFriends = this.auth.getPendingFriends(this.data.user)
  }

  findFriends() {
    this.bottomSheet.open(AddFriendComponent, {
      data: {
        user: this.data.user
      },
      autoFocus: false
    });
  }

  pendingRequests() {
    this.bottomSheet.open(PendingRequestsComponent, {
      data: {
        user: this.data.user
      },
      autoFocus: false
    });
  }

  currentFriends() {
    this.bottomSheet.open(CurrentFriendsComponent, {
      data: {
        user: this.data.user
      },
      autoFocus: false
    });
  }


  logOut() {
    this.bottomSheet.dismiss()
    setTimeout(() => {
      this.auth.signOut();
    }, 500);
  }

}
