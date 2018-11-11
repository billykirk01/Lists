import { Component, Input } from '@angular/core';
import { item } from 'src/models/item';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  @Input() item: item;

  constructor(private db: AngularFirestore) { }

  checkboxChanged(event: MatCheckboxChange) {
    const itemRef: AngularFirestoreDocument<any> = this.db.doc(`items/${this.item.id}`);
    const data = {
      completed: event.checked,
    }
    return itemRef.set(data, { merge: true })
  }

  finishedEditingItem(event: any) {
    const itemRef: AngularFirestoreDocument<any> = this.db.doc(`items/${this.item.id}`);
    const data = {
      name: event.target.value
    }
    return itemRef.set(data, { merge: true })
  }

  deleteItem() {
    this.db.doc<item>(`items/${this.item.id}`).delete();
  }

}
