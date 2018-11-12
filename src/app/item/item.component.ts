import { Component, Input } from '@angular/core';
import { item } from 'src/models/item';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ItemsService } from '../core/items.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  @Input() item: item;

  constructor(private database: ItemsService) { }

  checkboxChanged(event: MatCheckboxChange) {
    this.database.editItemStatus(this.item, event.checked);
  }

  finishedEditingItem(event: any) {
    this.database.editItemName(this.item, event.target.value);
  }

  deleteItem() {
    this.database.deleteItem(this.item);
  }

}
