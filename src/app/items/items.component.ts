import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ItemsService } from '../core/items.service';
import { Observable } from 'rxjs';
import { item } from 'src/models/item';
import { user } from 'src/models/user';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnChanges {

  @Input() user: user;

  incompleteItems: Observable<item[]>;

  completedItems: Observable<item[]>;

  completedItemsMeta: { completedItemsLength: Number } = { completedItemsLength: 0 };

  showCompleted: Boolean;

  constructor(private database: ItemsService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.user.currentValue.currentList && (!changes.user.previousValue || changes.user.currentValue.currentList != changes.user.previousValue.currentList)) {
      this.getIncompleteItems();
      this.getCompletedItems();
    }
  }

  getIncompleteItems() {
    if (this.user && this.user.currentList) {
      this.incompleteItems = this.database.getIncompleteItems(this.user);
    } else {
      this.incompleteItems = null;
    }
  }

  getCompletedItems() {
    if (this.user && this.user.currentList) {
      this.completedItems = this.database.getcompletedItems(this.user, this.completedItemsMeta);
    } else {
      this.completedItems = null;
    }
  }

}
