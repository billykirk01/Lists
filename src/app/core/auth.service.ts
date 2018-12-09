import { Injectable } from '@angular/core';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firestore } from 'firebase/app'

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { user } from 'src/models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {

  user: Observable<user>;

  friends: Observable<user[]>;
  pendingFriends: Observable<user[]>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {

    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<user>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )

    this.user.subscribe(
      user => localStorage.setItem('user', JSON.stringify(user))
    )

  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateOrCreateUserData(credential.user)
      })
  }

  private updateOrCreateUserData(user: user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: user = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    return userRef.set(data, { merge: true })

  }

  getFriends(user: user) {
    if (user) {
      this.friends = this.afs.collection('users', ref => ref.where('friends', 'array-contains', user.uid)).valueChanges()
    }
  }

  getPendingFriends(user: user) {
    if (user) {
      this.pendingFriends = this.afs.collection('users', ref => ref.where('pendingFriends', 'array-contains', user.uid)).valueChanges()
    }
  }

  sendFriendRequest(user: user, email: string) {

    let recipientDoc = this.afs.collection('users', (ref) => ref.where('email', '==', email).limit(1)).valueChanges();

    recipientDoc.subscribe((_user: any) => {
      if (_user[0].uid) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

        userRef.update({
          pendingFriends: firestore.FieldValue.arrayUnion(_user[0].uid)
        })
      }
    });
  }

  acceptFriendRequest(user: user, uid: string) {
    this.afs.collection('users').doc(uid).update({
      friends: firestore.FieldValue.arrayUnion(user.uid)
    })

    this.afs.collection('users').doc(user.uid).update({
      friends: firestore.FieldValue.arrayUnion(uid)
    })

    this.afs.collection('users').doc(uid).update({
      pendingFriends: firestore.FieldValue.arrayRemove(user.uid)
    })
  }

  declineFriendRequest(user: user, uid: string) {
    this.afs.collection('users').doc(uid).update({
      pendingFriends: firestore.FieldValue.arrayRemove(user.uid)
    })
  }

  removeFriend(user: user, uid: string) {
    this.afs.collection('users').doc(user.uid).update({
      friends: firestore.FieldValue.arrayRemove(uid)
    })

    this.afs.collection('users').doc(uid).update({
      friends: firestore.FieldValue.arrayRemove(user.uid)
    })
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      localStorage.clear();
      window.location.reload();
    })

  }

}