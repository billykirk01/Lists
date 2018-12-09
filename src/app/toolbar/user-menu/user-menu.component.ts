import { Component, Input, Output, EventEmitter } from '@angular/core';
import { user } from 'src/models/user';
import { AuthService } from 'src/app/core/auth.service';
import { MatBottomSheet } from '@angular/material';
import { UserManagerComponent } from 'src/app/user-manager/user-manager.component';
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

  constructor(private database: AuthService, private bottomSheet: MatBottomSheet) { }

  logIn() {
    this._logInButtonClicked.emit()
  }

  manageUser() {
    this.bottomSheet.open(UserManagerComponent, {
      data: {
        user: this.user,
        friends: this.friends,
        pendingFriends: this.pendingFriends
      },
      autoFocus: false
    });
  }

}
