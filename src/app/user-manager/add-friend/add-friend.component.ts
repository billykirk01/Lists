import { Component, Inject } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent {

  constructor(private database: AuthService, private bottomSheetRef: MatBottomSheetRef<AddFriendComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

  sendFriendRequest(event: any) {
    if (event.key == 'Enter') {
      this.database.sendFriendRequest(this.data.user, event.target.value)
      event.target.value = ""
      this.bottomSheetRef.dismiss();
      event.preventDefault();
    }
  }

}
