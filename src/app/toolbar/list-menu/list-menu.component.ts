import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { user } from 'src/models/user';
import { ItemsService } from '../../core/items.service';
import { Observable } from 'rxjs';
import { list } from 'src/models/list';

import { NewListComponent } from '../new-list/new-list.component'
import { ListManagerComponent } from '../../list-manager/list-manager.component'
import { MatBottomSheet } from '@angular/material';
import { ListDetailComponent } from 'src/app/list-manager/list-detail/list-detail.component';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.css']
})
export class ListMenuComponent implements OnChanges {

  @Input() user: user;

  @Input() friends: Observable<user[]>;

  lists: Observable<list[]>;

  constructor(private database: ItemsService, private bottomSheet: MatBottomSheet) { }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.user.previousValue || changes.user.currentValue.currentList != changes.user.previousValue.currentList) {
      this.getLists();
    }
  }

  getLists() {
    if (this.user) {
      this.lists = this.database.getLists(this.user);
    }
  }


  openListManager() {
    this.bottomSheet.open(ListManagerComponent, {
      data: {
        friends: this.friends,
        lists: this.lists,
        user: this.user
      },
      autoFocus: false
    });
  }


}
