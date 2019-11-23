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
import { Store } from '@ngrx/store';
import { login, logout } from 'src/app/store/actions/auth.actions';
import * as firebase from 'firebase/app';
import { LoaderService } from '../services/loader.service';

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
    private store: Store<{ auth: boolean }>,
    private loaderService: LoaderService
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

  createUserWithEmailAndPassword(credentials: EmailPasswordCredentials) {
    this.loaderService.show();

    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even if
    // a user forgets to sign out.
    this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

    this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(async data => {
        // await this.addDefaultUserDoc(data.user);
        // await this.addDefaultAccessDoc(data.user);
        // return this.router.navigate(['/my-profile']);

        const dbUsersOnCall = this.fns.httpsCallable('dbUsersOnCall')({
          uid: data.user.uid,
          email: data.user.email,
          displayName: data.user.displayName,
          photoURL: data.user.photoURL
        });
        await dbUsersOnCall.toPromise();
        const dbAccessOnCall = this.fns.httpsCallable('dbAccessOnCall')({
          uid: data.user.uid,
          email: data.user.email,
          displayName: data.user.displayName,
          photoURL: data.user.photoURL
        });
        await dbAccessOnCall.toPromise();
        this.store.dispatch(login());
        this.loaderService.hide();
        return this.router.navigate(['/my-profile']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  signInWithEmailAndPassword(credentials: EmailPasswordCredentials) {
    this.loaderService.show();

    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even if
    // a user forgets to sign out.
    this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

    this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        this.store.dispatch(login());
        this.loaderService.hide();
        return this.router.navigate(['/my-profile']);
      })
      .catch(error => {
        this.loaderService.hide();
        console.log(error);
      });
  }

  async signInWithGoogle() {
    this.loaderService.show();

    const provider = new auth.GoogleAuthProvider();
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even if
    // a user forgets to sign out.
    this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

    this.afAuth.auth.signInWithPopup(provider)
      .then(async data => {
        if (data.additionalUserInfo.isNewUser) {
          // this.addDefaultUserDoc(data.user);
          // this.addDefaultAccessDoc(data.user);

          const dbUsersOnCall = this.fns.httpsCallable('dbUsersOnCall')({
            uid: data.user.uid,
            email: data.user.email,
            displayName: data.user.displayName,
            photoURL: data.user.photoURL
          });
          await dbUsersOnCall.toPromise();
          const dbAccessOnCall = this.fns.httpsCallable('dbAccessOnCall')({
            uid: data.user.uid,
            email: data.user.email,
            displayName: data.user.displayName,
            photoURL: data.user.photoURL
          });
          await dbAccessOnCall.toPromise();
        }
        this.store.dispatch(login());
        this.loaderService.hide();
        return this.router.navigate(['/my-profile']);
      })
      .catch(error => {
        this.loaderService.hide();
        console.log(error);
      });
  }

  async signOut() {
    this.store.dispatch(logout());
    this.router.navigate(['/login']);
    // this.afAuth.auth.signOut();
  }

  // async addDefaultUserDoc({ uid, email, displayName, photoURL }: User) {
  //   const callable = await this.fns.httpsCallable('dbUsersOnCall');
  //   await callable({ uid, email, displayName, photoURL });
  // }

  // async addDefaultAccessDoc({ uid, email, displayName, photoURL }: User) {
  //   const callable = await this.fns.httpsCallable('dbAccessOnCall');
  //   await callable({ uid, email, displayName, photoURL });
  // }
}
