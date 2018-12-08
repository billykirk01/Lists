import { Injectable } from '@angular/core';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { user } from 'src/models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {

  user: Observable<user>;

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

  private updateOrCreateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: user = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    return userRef.set(data, { merge: true })

  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      localStorage.clear();
      window.location.reload();
    })

  }

}