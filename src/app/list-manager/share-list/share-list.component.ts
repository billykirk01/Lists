import { Component, Inject, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/core/items.service';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA, MatChipInputEvent, MatAutocomplete, MatAutocompleteSelectedEvent, MatSelectChange } from '@angular/material';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { user } from 'src/models/user';

@Component({
  selector: 'app-share-list',
  templateUrl: './share-list.component.html',
  styleUrls: ['./share-list.component.css']
})
export class ShareListComponent {

  constructor(private database: ItemsService, private bottomSheet: MatBottomSheet, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    if (this.data.list.sharedUsers) {
      for (let sharedUser of this.data.list.sharedUsers) {
        this.database.getUser(sharedUser).subscribe((user) => {
          this.selectedFriends.push(user)
        })
      }
    }
  }

  selectedFriends: user[] = [];

  selectionChange(event: MatSelectChange) {
    if (this.selectedFriends.some(friend => friend.uid === event.value.uid)) {
      event.source.value = null;
    } else {
      this.selectedFriends.push(event.value)
      event.source.value = null;
    }

  }

  remove(index: number) {
    this.selectedFriends.splice(index, 1);
  }

  ngOnDestroy(): void {
    this.database.shareList(this.data.list, this.selectedFriends)
  }

}


