import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../core/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { list } from 'src/models/list';
import { user } from 'src/models/user';
import { NewListComponent } from '../new-list/new-list.component'
import { MatBottomSheet } from '@angular/material';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  @Input() user: user;

  listsCollection: AngularFirestoreCollection<list>;
  lists: Observable<list[]>;
  currentList: String;
  currentListName: String;

  @Output('LogIn')
  _logInButtonClicked = new EventEmitter();

  @Output('LogOut')
  _logOutButtonClicked = new EventEmitter();

  constructor(private db: AngularFirestore, public auth: AuthService, private bottomSheet: MatBottomSheet) { }

  ngOnChanges(changes: SimpleChanges) {
    this.getLists();
  }

  logInButtonClicked() {
    this._logInButtonClicked.emit()
  }

  logOutButtonClicked() {
    this._logOutButtonClicked.emit()
  }

  addList() {
    this.bottomSheet.open(NewListComponent, {
      data: { user: this.user }
    });
  }

  changeList(newList: any) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${this.user.uid}`);
    const data = {
      currentList: newList.id,
      currentListName: newList.name
    }

    return userRef.set(data, { merge: true }).then(
      () => {
        this.currentList = newList.id;
        this.currentListName = newList.name;
      }
    )
  }

  deleteList(listID: String) {

    this.db.collection('items').ref.where('owningList', '==', listID).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete()
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

    this.db.doc<list>(`lists/${listID}`).delete();
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${this.user.uid}`);
    const data = {
      currentList: null,
      currentListName: null
    }

    return userRef.set(data, { merge: true })


  }

  getLists() {
    if (this.user) {
      this.currentList = this.user.currentList;
      this.currentListName = this.user.currentListName;
      this.listsCollection = this.db.collection<list>('lists', ref => {
        return ref.where('owningUser', '==', this.user.uid).orderBy('addInstant', 'asc')
      });
      this.lists = this.listsCollection.snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as list;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }));
    } else {
      this.lists = null;
    }
  }
}
