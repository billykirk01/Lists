import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { ItemsService } from 'src/app/core/items.service';

@Component({
  selector: 'app-rename-list',
  templateUrl: './rename-list.component.html',
  styleUrls: ['./rename-list.component.css']
})
export class RenameListComponent {

  constructor(private database: ItemsService, private bottomSheetRef: MatBottomSheetRef<RenameListComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

  renameList(event: any) {
    if (event.key == 'Enter') {
      this.database.renameList(this.data.user, this.data.list, event.target.value)
      event.target.value = ""
      this.bottomSheetRef.dismiss();
      event.preventDefault();
    }

  }

}
