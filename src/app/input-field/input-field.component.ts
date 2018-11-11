import { Component, Input } from '@angular/core';
import { user } from 'src/models/user';
import { item } from 'src/models/item';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { firestore } from 'firebase/app'

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})
export class InputFieldComponent {

  @Input() user: user;

  private itemsCollection: AngularFirestoreCollection<item>;

  constructor(private db: AngularFirestore) { }

  addTask(event: any) {
    if (event.key == 'Enter') {
      this.itemsCollection = this.db.collection<item>('items');
      const item: item = {
        name: event.target.value as String,
        owningUser: this.user.uid,
        owningList: this.user.currentList,
        addInstant: firestore.FieldValue.serverTimestamp(),
        completed: false,
      }
      this.itemsCollection.add(item)
      event.target.value = ""
    }
  }

}
