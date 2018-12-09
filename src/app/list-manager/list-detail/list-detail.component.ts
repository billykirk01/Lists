import { Component, Inject } from '@angular/core';
import { ItemsService } from 'src/app/core/items.service';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { RenameListComponent } from '../rename-list/rename-list.component';
import { ShareListComponent } from '../share-list/share-list.component';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent {


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
