import { Component, Input, Output, EventEmitter } from '@angular/core';
import { user } from 'src/models/user';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent {

  @Input() user: user;

  @Output('LogIn')
  _logInButtonClicked = new EventEmitter();

  @Output('LogOut')
  _logOutButtonClicked = new EventEmitter();

  constructor() { }

  logInButtonClicked() {
    this._logInButtonClicked.emit()
  }

  logOutButtonClicked() {
    this._logOutButtonClicked.emit()
  }

}
