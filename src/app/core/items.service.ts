import { Injectable } from '@angular/core';

import { firestore } from 'firebase/app'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { map } from 'rxjs/operators'

import { user } from 'src/models/user';
import { list } from 'src/models/list';
import { item } from 'src/models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private db: AngularFirestore) { }

  addItem(user: user, taskName: String) {
    let itemsCollection = this.db.collection<item>('items');
    const item: item = {
      name: taskName,
      owningUser: user.uid,
      owningList: user.currentList,
      addInstant: firestore.FieldValue.serverTimestamp(),
      completed: false,
    }
    itemsCollection.add(item)
  }

  editItemName(item: item, newItemName: String) {
    const itemRef: AngularFirestoreDocument<any> = this.db.doc(`items/${item.id}`);
    const data = {
      name: newItemName
    }
    return itemRef.set(data, { merge: true })
  }

  editItemStatus(item: item, completed: Boolean) {
    const itemRef: AngularFirestoreDocument<any> = this.db.doc(`items/${item.id}`);
    const data = {
      completed: completed,
    }
    return itemRef.set(data, { merge: true })
  }

  deleteItem(item: item) {
    this.db.doc<item>(`items/${item.id}`).delete();
  }

  getIncompleteItems(user: user) {
    let incompleteItemsCollection = this.db.collection<item>('items', ref => {
      return ref.where('owningList', '==', user.currentList).where('completed', '==', false).orderBy('addInstant', 'asc')
    });
    return incompleteItemsCollection.snapshotChanges().pipe(map(incompleteTasks => {
      return incompleteTasks.map(task => {
        const data = task.payload.doc.data() as item;
        const id = task.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getcompletedItems(user: user, completedItemsMetaData: any) {
    let completedItemsCollection = this.db.collection<item>('items', ref => {
      return ref.where('owningList', '==', user.currentList).where('completed', '==', true).orderBy('addInstant', 'asc')
    });
    return completedItemsCollection.snapshotChanges().pipe(map(completedItems => {
      completedItemsMetaData.completedItemsLength = completedItems.length;
      return completedItems.map(task => {
        const data = task.payload.doc.data() as item;
        const id = task.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getLists(user: user) {
    let listsCollection = this.db.collection<list>('lists', ref => {
      return ref.where('owningUser', '==', user.uid).orderBy('addInstant', 'asc')
    });
    return listsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as list;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  addList(user: user, listName: String) {
    let listsCollection = this.db.collection<list>('lists');
    var newListName = listName;
    const list: list = {
      name: newListName,
      owningUser: user.uid,
      addInstant: firestore.FieldValue.serverTimestamp(),
    }
    listsCollection.add(list).then(
      (docRef) => {
        const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);

        const userData: user = {
          currentList: docRef.id,
          currentListName: newListName

        }

        return userRef.set(userData, { merge: true })
      }
    )
  }

  changeList(user: user, list: list) {
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);
    const data = {
      currentList: list.id,
      currentListName: list.name
    }

    return userRef.set(data, { merge: true })
  }

  deleteList(user: user, list: list) {

    this.db.collection('items').ref.where('owningList', '==', list.id).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete()
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

    this.db.doc<list>(`lists/${list.id}`).delete();
    if (list.id == user.currentList) {
      const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);
      const data = {
        currentList: null,
        currentListName: null
      }

      return userRef.set(data, { merge: true })
    }
  }
}

