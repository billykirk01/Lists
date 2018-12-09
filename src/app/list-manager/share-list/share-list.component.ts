import { Component, Inject, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/core/items.service';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA, MatChipInputEvent, MatAutocomplete, MatAutocompleteSelectedEvent, MatSelectChange } from '@angular/material';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { user } from 'src/models/user';
import { list } from 'src/models/list';

@Component({
  selector: 'app-share-list',
  templateUrl: './share-list.component.html',
  styleUrls: ['./share-list.component.css']
})
export class ShareListComponent {

  list: list;

  selectedFriends: user[] = [];

  constructor(private database: ItemsService, private bottomSheet: MatBottomSheet, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.database.getList(this.data.list.id).subscribe(list => {
      this.list = list
      if (list.sharedUsers.length) {
        for (let sharedUser of list.sharedUsers) {
          this.database.getUser(sharedUser).subscribe((user) => {
            this.selectedFriends.push(user)
          })
        }
      }
    })
  }

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
    if (this.list.sharedUsers != this.selectedFriends) {
      this.database.shareList(this.data.list, this.selectedFriends)
    }
  }

}


