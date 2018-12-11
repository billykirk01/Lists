import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { user } from 'src/models/user';
import { ItemsService } from '../../core/items.service';
import { AuthService } from '../../core/auth.service';
import { Observable } from 'rxjs';
import { list } from 'src/models/list';
import { ListManagerComponent } from '../../list-manager/list-manager.component'
import { MatBottomSheet } from '@angular/material';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.css']
})
export class ListMenuComponent implements OnChanges {

  @Input() user: user;

  friends: user[];

  lists: list[];

  constructor(private database: ItemsService, private auth: AuthService, private bottomSheet: MatBottomSheet) { }

  ngOnChanges(changes: SimpleChanges) {
    //check if user exists to prevent logout error
    if (!changes.user) {
      return
    }
    if (changes.user.currentValue && !changes.user.previousValue) {
      this.database.getLists(this.user).subscribe((lists) => {
        this.lists = lists;
      })
      this.auth.getFriends(this.user).subscribe((friends) => {
        this.friends = friends;
      })
    }
    if (changes.user.currentValue && changes.user.previousValue && changes.user.currentValue.currentList != changes.user.previousValue.currentList) {
      this.database.getLists(this.user).subscribe((lists) => {
        this.lists = lists;
      })
    }
  }

  openListManager() {
    this.bottomSheet.open(ListManagerComponent, {
      data: {
        user: this.user,
        friends: this.friends,
        lists: this.lists,
      },
      autoFocus: false,
      restoreFocus: false
    });
  }


}
