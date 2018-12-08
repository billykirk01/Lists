import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { user } from 'src/models/user';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  @Input() user: user;

  @Output('LogIn')
  _logInButtonClicked = new EventEmitter();

  @Output('LogOut')
  _logOutButtonClicked = new EventEmitter();

  logInButtonClicked() {
    this._logInButtonClicked.emit()
  }

  logOutButtonClicked() {
    this._logOutButtonClicked.emit()
  }

}
