import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user-profile/user.model';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
    isLogin = false
    user$: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router
    ) {
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
            // Logged in
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            // Logged out
            return of(null);
          }
        })
      )
    }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    window.localStorage.removeItem('fav_pict')
    return this.updateUserData(credential.user);
  }

  private updateUserData(user: any) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    window.localStorage.setItem('user', JSON.stringify(data));
    this.isLogin = true

    return userRef.set(data, { merge: true })
  }

  autoLogin() {
    const storage = JSON.parse(localStorage.getItem('user'))
    if (storage != null) {
      return this.updateUserData(storage)
    }
    return null;
  }

  async signOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user')
    this.isLogin = false
    this.router.navigate(['/']);
  }
}
