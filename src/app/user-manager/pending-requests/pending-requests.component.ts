import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { user } from 'src/models/user';
import { AuthService } from 'src/app/core/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pending-requests',
  templateUrl: './pending-requests.component.html',
  styleUrls: ['./pending-requests.component.css']
})
export class PendingRequestsComponent {

  pendingFriends: Observable<user[]>

  constructor(private auth: AuthService, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.pendingFriends = this.auth.getPendingFriends(this.data.user);
  }

  acceptRequest(friend: user) {
    this.auth.acceptFriendRequest(this.data.user, friend.uid);
  }

  declineRequest(friend: user) {
    this.auth.declineFriendRequest(this.data.user, friend.uid);
  }

}
