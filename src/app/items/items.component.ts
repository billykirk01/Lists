import { Component, Input, SimpleChanges } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { item } from 'src/models/item';
import { user } from 'src/models/user';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {

  @Input() user: user;

  incompleteItemsCollection: AngularFirestoreCollection<item>;
  incompleteItems: Observable<item[]>;
  incompleteItemsLength: Number;

  completedItemsCollection: AngularFirestoreCollection<item>;
  completedItems: Observable<item[]>;
  completedItemsLength: Number;
  showCompleted: Boolean;

  constructor(private db: AngularFirestore) {
    this.showCompleted = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.incompleteItemsLength = 0;
    this.completedItemsLength = 0;
    this.getIncompleteItems();
    this.getCompletedItems();
  }

  getIncompleteItems() {
    if (this.user && this.user.currentList) {
      this.incompleteItemsCollection = this.db.collection<item>('items', ref => {
        return ref.where('owningList', '==', this.user.currentList).where('completed', '==', false).orderBy('addInstant', 'asc')
      });
      this.incompleteItems = this.incompleteItemsCollection.snapshotChanges().pipe(map(incompleteTasks => {
        this.incompleteItemsLength = incompleteTasks.length;
        return incompleteTasks.map(task => {
          const data = task.payload.doc.data() as item;
          const id = task.payload.doc.id;
          return { id, ...data };
        });
      }));
    } else {
      this.incompleteItems = null;
    }
  }

  getCompletedItems() {
    if (this.user && this.user.currentList) {
      this.completedItemsCollection = this.db.collection<item>('items', ref => {
        return ref.where('owningList', '==', this.user.currentList).where('completed', '==', true).orderBy('addInstant', 'asc')
      });
      this.completedItems = this.completedItemsCollection.snapshotChanges().pipe(map(completedTasks => {
        this.completedItemsLength = completedTasks.length;
        return completedTasks.map(task => {
          const data = task.payload.doc.data() as item;
          const id = task.payload.doc.id;
          return { id, ...data };
        });
      }));
    } else {
      this.completedItems = null;
    }
  }

}
