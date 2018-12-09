import { Component, Input, Output, EventEmitter } from '@angular/core';
import { user } from 'src/models/user';
import { ItemsService } from 'src/app/core/items.service';
import { MatBottomSheet } from '@angular/material';
import { FriendsManagerComponent } from 'src/app/friends-manager/freinds-manager.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent {

  @Input() user: user;

  @Input() friends?: Observable<user[]>;

  @Input() pendingFriends?: Observable<user[]>;

  @Output('LogIn')
  _logInButtonClicked = new EventEmitter();

  @Output('LogOut')
  _logOutButtonClicked = new EventEmitter();

  constructor(private database: ItemsService, private bottomSheet: MatBottomSheet) { }

  logInButtonClicked() {
    this._logInButtonClicked.emit()
  }

  logOutButtonClicked() {
    this._logOutButtonClicked.emit()
  }

  manageFriends() {
    this.bottomSheet.open(FriendsManagerComponent, {
      data: {
        user: this.user,
        friends: this.friends,
        pendingFriends: this.pendingFriends
      },
      autoFocus: false
    });
  }

}
