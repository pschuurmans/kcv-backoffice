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
        this.updateUserDoc(data.user);
        return this.router.navigate(['/my-profile']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async createUserWithEmailAndPassword(credentials: EmailPasswordCredentials) {
    await this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(data => {
        this.updateUserDoc(data.user);
        this.addDefaultAccessDoc(data.user);
      })
      .then(() => {
        return this.router.navigate(['/my-profile']);
      });
  }

  async signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.updateUserDoc(credential.user);
    if (credential.additionalUserInfo.isNewUser) {
      // When is new user, create default access doc
      this.addDefaultAccessDoc(credential.user);
    }
    return this.router.navigate(['/my-profile']);
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/login']);
  }

  async updateUserDoc({ uid, email, displayName, photoURL }: User) {
    const callable = await this.fns.httpsCallable('dbUsersOnCall');
    await callable({ uid, email, displayName, photoURL });
  }

  async addDefaultAccessDoc({ uid }: User) {
    const callable = await this.fns.httpsCallable('dbAccessOnCall');
    await callable({ uid });
  }
}
