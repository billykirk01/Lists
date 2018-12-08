import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { user } from 'src/models/user';
import { ItemsService } from '../../core/items.service';
import { Observable } from 'rxjs';
import { list } from 'src/models/list';

import { NewListComponent } from '../new-list/new-list.component'
import { MatBottomSheet } from '@angular/material';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.css']
})
export class ListMenuComponent implements OnChanges {

  @Input() user: user;

  lists: Observable<list[]>;

  constructor(private database: ItemsService, private bottomSheet: MatBottomSheet) { }

  ngOnChanges(changes: SimpleChanges) {
    this.getLists();
  }

  getLists() {
    if (this.user) {
      this.lists = this.database.getLists(this.user);
    }
  }

  changeList(list: list) {
    this.database.changeList(this.user, list);
  }

  newList() {
    this.bottomSheet.open(NewListComponent, {
      data: { user: this.user }
    });
  }

  deleteList(list: list) {
    this.database.deleteList(this.user, list);
  }


}
