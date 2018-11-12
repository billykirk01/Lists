import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { ItemsService } from '../core/items.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent {

  constructor(private database: ItemsService, private bottomSheetRef: MatBottomSheetRef<NewListComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

  addList(event: any) {
    if (event.key == 'Enter') {
      this.database.addList(this.data.user, event.target.value)
      event.target.value = ""
      this.bottomSheetRef.dismiss();
      event.preventDefault();
    }
  }

}
