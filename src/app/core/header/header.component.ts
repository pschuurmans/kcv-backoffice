import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Access } from '../auth/access';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  roles: string[] = [];

  constructor(public auth: AuthService, private afAuth: AngularFireAuth, private afs: AngularFirestore) { }

  ngOnInit() {
    const currentUser = this.afAuth.auth.currentUser;

    if (currentUser !== null) {
      this.afs.doc<Access>(`access/${currentUser.uid}`).valueChanges()
        .subscribe(
          doc => this.roles = doc.roles,
          error => console.error(error)
        );
    }
  }
}
