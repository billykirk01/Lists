import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firestore } from 'firebase/app'
import { MatBottomSheetRef } from '@angular/material';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { list } from 'src/models/list';
import { user } from 'src/models/user';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent {

  // @Output() listAdded = new EventEmitter<{ id: String, name: String }>();

  private listsCollection: AngularFirestoreCollection<list>;

  constructor(private db: AngularFirestore, private bottomSheetRef: MatBottomSheetRef<NewListComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

  addList(event: any) {
    if (event.key == 'Enter') {
      this.listsCollection = this.db.collection<list>('lists');
      var newListName = event.target.value as String;
      const list: list = {
        name: newListName,
        owningUser: this.data.user.uid,
        addInstant: firestore.FieldValue.serverTimestamp(),
      }
      this.listsCollection.add(list).then(
        (docRef) => {
          const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${this.data.user.uid}`);

          const userData: user = {
            currentList: docRef.id,
            currentListName: newListName

          }

          return userRef.set(userData, { merge: true })
        }
      )
      event.target.value = ""
      this.bottomSheetRef.dismiss();
      event.preventDefault();
    }
  }

}
