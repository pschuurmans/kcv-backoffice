import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuthenticated = false;

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(
      data => {
        if (data === null) {
          this.isAuthenticated = false;
        } else {
          this.isAuthenticated = true;
        }
      }
    );
  }
}
