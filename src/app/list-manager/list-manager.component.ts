import { Component, Inject } from '@angular/core';

import { MatBottomSheet } from '@angular/material';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { RenameListComponent } from './rename-list/rename-list.component';
import { ItemsService } from '../core/items.service';
import { ShareListComponent } from './share-list/share-list.component';

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.css']
})
export class ListManagerComponent {

  constructor(private database: ItemsService, private bottomSheet: MatBottomSheet, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

  renameList() {
    this.bottomSheet.open(RenameListComponent, { data: this.data })
  }

  shareList() {
    this.bottomSheet.open(ShareListComponent, { data: this.data })
  }

  deleteList() {
    this.database.deleteList(this.data.user, this.data.list)
    this.bottomSheet.dismiss()
  }



}
