import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.auth.user$.pipe(
      take(1),
      map(user => !!user), // <-- map to boolean
      tap(loggedIn => {
        if (loggedIn) {
          this.router.navigate(['/dashboard']);
        }
      })
    );
  }
}