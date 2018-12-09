import { Component, Inject } from '@angular/core';

import { MatBottomSheet } from '@angular/material';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { ItemsService } from '../core/items.service';
import { list } from 'src/models/list';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { NewListComponent } from '../toolbar/new-list/new-list.component';

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.css']
})
export class ListManagerComponent {

  constructor(private database: ItemsService, private bottomSheet: MatBottomSheet, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

  newList() {
    this.bottomSheet.open(NewListComponent, {
      data: { user: this.data.user }
    });
  }

  changeList(list: list) {
    this.database.changeList(this.data.user, list);
    this.bottomSheet.dismiss();
  }


  openListDetail(list: list) {
    this.bottomSheet.open(ListDetailComponent, {
      data: {
        friends: this.data.friends,
        list: list,
        user: this.data.user
      },
      autoFocus: false
    });
  }

}
