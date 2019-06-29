import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user';
import { AngularFireFunctions } from '@angular/fire/functions';
import { EmailPasswordCredentials } from './email-password-credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private fns: AngularFireFunctions,
    private router: Router,
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async signInWithEmailAndPassword(credentials: EmailPasswordCredentials) {
    await this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(data => {
        this.updateUserData(data.user);
        return this.router.navigate(['/dashboard']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async createUserWithEmailAndPassword(credentials: EmailPasswordCredentials) {
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
    await this.updateUserData(result.user);
    await this.addDefaultAccessDoc(result.user.uid);
    return this.router.navigate(['/my-profile']);
  }

  async signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.updateUserData(credential.user);
    if (credential.additionalUserInfo.isNewUser) {
      this.addDefaultAccessDoc(credential.user.uid);
    }
    return this.router.navigate(['/my-profile']);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/login']);
  }

  private updateUserData({ uid, email, displayName, photoURL }: User) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      displayName,
      photoURL
    };

    return userRef.set(data, { merge: true });
  }

  async addDefaultAccessDoc(uid) {
    const callable = await this.fns.httpsCallable('addDefaultAccessDoc');
    callable({ uid });
  }
}
