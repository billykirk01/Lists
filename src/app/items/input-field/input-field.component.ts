import { Component, Input } from '@angular/core';
import { user } from 'src/models/user';
import { ItemsService } from '../../core/items.service'

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent {

  @Input() user: user;

  constructor(private database: ItemsService) { }

  addItem(event: any) {
    if (event.key == 'Enter') {
      this.database.addItem(this.user, event.target.value)
      event.target.value = ""
    }
  }

}
