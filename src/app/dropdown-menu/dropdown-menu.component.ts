import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { user } from 'src/models/user';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css']
})
export class DropdownMenuComponent {

  @Input() user: user;

  @Input() items: any;
  @Input() selectedItemID: String;
  @Input() selectedItemName: String;
  @Input() menuIcon: String;
  @Input() selectedIcon: String;
  @Input() unselectedIcon: String;
  @Input() newItemIcon: String;
  @Input() newItemLabel: String;
  @Input() defaultLabel: String;

  @Output() newItemClicked = new EventEmitter();
  @Output() selectionMade = new EventEmitter<{ id: String, name: String }>();
  @Output() itemDeleted = new EventEmitter<String>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedItemName && changes.selectedItemName.currentValue == null) {
      this.selectedItemName = this.defaultLabel;
    }

  }

  selection(itemID: String, itemName: String) {
    this.selectionMade.emit({ id: itemID, name: itemName });
  }

  openNewItemSheet() {
    this.newItemClicked.emit();
  }

  deleteItem(itemID: String) {
    this.itemDeleted.emit(itemID);
  }

}
