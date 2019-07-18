import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, take, map, tap } from 'rxjs/operators';
import { User } from './user';
import { Access } from './access';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.afAuth.user.subscribe(
      data => {
        this.afs.doc<Access>(`access/${data.uid}`).valueChanges()
          .subscribe(
            doc => {
              if (!doc.roles.includes('ADMIN')) {
                this.router.navigate(['/no-access']);
              }
            },
            error => {
              console.log(error);
              this.router.navigate(['/no-access']);
            }
          );
      }
    );
    return true;
  }
}
