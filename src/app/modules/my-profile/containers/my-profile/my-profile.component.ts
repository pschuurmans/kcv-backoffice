import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Access } from 'src/app/core/auth/access';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  // access: Observable<Access>;
  access: any;
  roles: string[] = [];

  constructor(
    public auth: AuthService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
    ) { }

  ngOnInit() {
    this.getAccess();
  }

  getAccess() {
    this.afs.doc<Access>(`access/${this.afAuth.auth.currentUser.uid}`).valueChanges()
      .subscribe(
        data => this.roles = data.roles,
        err => console.log(err)
      );
  }
}
